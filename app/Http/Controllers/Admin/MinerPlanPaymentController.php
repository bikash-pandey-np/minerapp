<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CustomerMinerTransaction as CMT;
use Carbon\Carbon;
use Throwable;
use Log;
use DB;
use App\Models\Miner;
use App\Models\MinerPlan;


class MinerPlanPaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = CMT::with(['customer', 'minerPlan']);

        $searchStatus = false;

        if ($request->has('search')) {
            $searchStatus = true;
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('transaction_identifier', 'like', "%{$searchTerm}%")
                  ->orWhere('txn_hash', 'like', "%{$searchTerm}%")
                  ->orWhereHas('customer', function($q) use ($searchTerm) {
                      $q->where('email', 'like', "%{$searchTerm}%")
                        ->orWhere('account_id', 'like', "%{$searchTerm}%");
                  })
                  ->orWhereHas('minerPlan', function($q) use ($searchTerm) {
                      $q->where('name', 'like', "%{$searchTerm}%")
                        ->orWhere('hash_power', 'like', "%{$searchTerm}%");
                  });
            });
        }

        $payments = $query->orderBy('created_at', 'desc')
            ->paginate(2);
        
        $payments->through(function($payment) {
            $payment->new_created_at = Carbon::parse($payment->created_at)->format('M d, Y h:i:s A');
            return $payment;
        });

        return Inertia::render('Admin/PlanPayments/Index', [
            'payments' => $payments,
            'searchStatus' => $searchStatus
        ]);
    }

    public function approve(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:customer_miner_transactions,id',
        ]);

        $payment = CMT::find($request->id);

        DB::beginTransaction();
        try {
            $payment->update([
                'is_approved' => true,
                'approved_at' => now(),
                'status' => 'approved'
            ]);


            $minerPlan = MinerPlan::find($payment->miner_plan_id);


            
            Miner::create([
                'customer_miner_transaction_id' => $payment->id,
                'customer_id' => $payment->customer_id,
                'miner_plan_id' => $payment->miner_plan_id,
                'hash_power' => $minerPlan->hash_power,
                'investment_amount' => $payment->investment_amount,
                'miner_name' => $minerPlan->name,
                'output_per_day' => $minerPlan->output_per_day,
                'output_per_hour' => $minerPlan->output_per_hour,
                'output_per_minute' => $minerPlan->output_per_minute,
                'approved_at' => now(),
                'expires_at' => now()->addDays($minerPlan->duration),
            ]);
            DB::commit();

            return back()->with('success', 'Payment approved successfully');
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error('Error approving payment: ' . $th->getMessage() . ' on line ' . $th->getLine());
            return back()->with('error', 'Failed to approve payment');
        }
    }

    public function reject(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:customer_miner_transactions,id',
            'reason' => 'required|string'
        ]);

        $payment = CMT::find($request->id);

        DB::beginTransaction();
        try {
            $payment->update([
                'status' => 'rejected',
                'reject_reason' => $request->reason,
                'is_approved' => false,
                'approved_at' => null
            ]);
            DB::commit();

            return back()->with('success', 'Payment rejected successfully');
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error('Error rejecting payment: ' . $th->getMessage() . ' on line ' . $th->getLine());
            return back()->with('error', 'Failed to reject payment');
        }
    }
}
