<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\CustomerProPayment;
use Illuminate\Support\Facades\Log;
use Throwable;
use Carbon\Carbon;
class UpgradeAccountController extends Controller
{
    public function index()
    {
       // Retrieve the authenticated customer along with their pro payments
        $customer = Customer::with('proPayments')->where('id', Auth::guard('customer')->user()->id)->first();

        // Check for pending payments and get the latest one if it exists
        $latest_pending_payment = $customer->proPayments()
            ->where('payment_status', 'pending')
            ->orderBy('payment_date', 'desc')
            ->first();

        // Determine if the customer has any pending payments
        $has_pending_payment = $latest_pending_payment !== null;

        // Return the Inertia view with the desired props
        return Inertia::render('Minerportal/Premium/Upgrade', [
            'is_pro_account' => $customer->is_pro_account,
            'subscription_ends_at' => [
                'date' => Carbon::parse($customer->pro_account_expiry)->format('M d, Y'),
                'time' => Carbon::parse($customer->pro_account_expiry)->format('h:i:s A'),
                'days_remaining' => Carbon::parse($customer->pro_account_expiry)->diffInDays(Carbon::now()),
            ],
            'has_pending_payment' => $has_pending_payment,
            'latest_pending_payment' => $latest_pending_payment,
            'walletAddress' => env('PRO_ACCOUNT_WALLET_ADDRESS'),
            'title' => 'Upgrade Account - ' . env('APP_NAME')
        ]);
    }

    public function handleUpgrade(Request $request)
    {
        $rules = [
            'txn_hash' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try{
            $customer = Customer::where('id', Auth::guard('customer')->user()->id)->first();

            CustomerProPayment::create([
                'customer_id' => $customer->id,
                'txn_id' => $request->txn_hash,
                'amount' => env('PRO_ACCOUNT_PRICE'),
                'payment_date' => now(),
                'payment_status' => 'pending',
            ]);

            return back()->with('success', 'Payment initiated successfully. Please wait for the payment to be confirmed.');

        }
        catch(Throwable $th){
            Log::error($th->getMessage());
            return back()->with('error', 'Something went wrong. Please try again later.');
        }


    }

    public function history()
    {
        $logs = CustomerProPayment::where('customer_id', Auth::guard('customer')->user()->id)
            ->orderBy('payment_date', 'desc')
            ->get()
            ->map(function($log) {
                $log->payment_date = Carbon::parse($log->payment_date)->diffForHumans();
                return $log;
            });

        return Inertia::render('Minerportal/Premium/History', [
            'logs' => $logs,
            'title' => 'Upgrade Payment History - ' . env('APP_NAME')
        ]);
    }
}
