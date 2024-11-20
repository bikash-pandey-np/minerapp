<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Miner;
use Carbon\Carbon;
use App\Events\MinerTotalEarnedEvent;
use App\Events\BroadcastBalanceEvent;
use App\Models\Customer;

class MineCurrency extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'miner:mine-currency';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mine currency for active miners';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            // Get all active miners
            $miners = Miner::where('is_active', true)->get();

            // Group miners by customer_id
            $minersByCustomer = $miners->groupBy('customer_id');

            foreach ($minersByCustomer as $customerId => $customerMiners) {
                $customer = Customer::findOrFail($customerId);
                $totalCustomerEarnings = 0;

                foreach ($customerMiners as $miner) {
                    // Calculate and update individual miner earnings
                    $newTotalEarned = $miner->total_earned + $miner->output_per_minute;
                    
                    $miner->update([
                        'total_earned' => $newTotalEarned
                    ]);

                    $totalCustomerEarnings += $newTotalEarned;

                    // Dispatch event for individual miner update
                    event(new MinerTotalEarnedEvent($customer->account_id, $newTotalEarned, $miner->identifier));
                    
                    $this->info("Updated miner {$miner->identifier} to {$newTotalEarned}");
                }

                // Update customer's total balance from all miners
                $customer->update([
                    'total_earned' => $totalCustomerEarnings,
                    'balance' => $totalCustomerEarnings,
                ]);

                // Broadcast updated total balance
                event(new BroadcastBalanceEvent($totalCustomerEarnings, $customer->account_id));
            }
        } catch (\Throwable $th) {
            $this->error("Error: {$th->getMessage()}");
            return 1;
        }

        return 0;
    }
}
