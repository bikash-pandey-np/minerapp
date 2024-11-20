<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use Illuminate\Support\Facades\Validator;
use Throwable;
use Illuminate\Support\Facades\Log;
use App\Events\BroadcastBalanceEvent;
use App\Models\Withdraw;
use Illuminate\Support\Facades\DB;

class WithdrawController extends Controller
{
    public function index()
    {
        return Inertia::render('Minerportal/Withdraw/Index', [
            'balance' => Auth::guard('customer')->user()->balance,
            'account_id' => Auth::guard('customer')->user()->account_id,
            'is_pro_account' => Auth::guard('customer')->user()->is_pro_account,
            'withdrawal_fee' => Auth::guard('customer')->user()->is_pro_account ?
                env('PRO_ACCOUNT_WITHDRAWAL_FEE', 5) :
                env('WITHDRAWAL_FEE', 10),
            'title' => 'Withdraw - ' . env('APP_NAME')
        ]);
    }

    public function handleWithdraw(Request $request)
    {
        $customer = Customer::findOrFail(Auth::guard('customer')->user()->id);

        // Set minimum withdrawal amount based on account type
        $minimumWithdrawal = $customer->is_pro_account ?
            env('PRO_ACCOUNT_WITHDRAWAL_MINIMUM', 1) :
            env('WITHDRAWAL_MINIMUM', 1);

        $rules = [
            'trc_20_wallet_address' => 'required|string|max:255',
            'amount' => [
                'required',
                'numeric',
                'min:' . $minimumWithdrawal
            ],
        ];

        $validator = Validator::make($request->all(), $rules, [
            'amount.min' => 'The minimum withdrawal amount is ' . $minimumWithdrawal . ' USDT',
            'amount.required' => 'Enter Withdrawal Amount',
            'amount.numeric' => 'Enter a valid number',
            'trc_20_wallet_address.required' => 'Enter USDT TRC-20 Wallet Address',
            'trc_20_wallet_address.string' => 'Enter a valid USDT TRC-20 Wallet Address',
            'trc_20_wallet_address.max' => 'Enter a valid USDT TRC-20 Wallet Address',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Check if user has sufficient balance
        if ($customer->balance < $request->amount) {
            return redirect()->back()->with('error', 'Insufficient balance');
        }

        DB::beginTransaction();
        try {
            $customer->balance -= $request->amount;
            $customer->save();

            Withdraw::create([
                'customer_id' => $customer->id,
                'request_amount' => $request->amount,
                'fee' => $customer->is_pro_account ?
                    env('PRO_ACCOUNT_WITHDRAWAL_FEE', 5) :
                    env('WITHDRAWAL_FEE', 10),
                'net_amount' => $customer->is_pro_account ?
                    $request->amount - env('PRO_ACCOUNT_WITHDRAWAL_FEE', 5) :
                    $request->amount - env('WITHDRAWAL_FEE', 10),
                'trc_20_wallet_address' => $request->trc_20_wallet_address,
                'status' => 'pending',
            ]);
            DB::commit();
            // event(new BroadcastBalanceEvent($customer->balance, $customer->account_id));
            return redirect()->back()->with('success', 'Withdrawal request submitted successfully');
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error('Withdrawal request failed: ' . $th->getMessage() . ' on line ' . $th->getLine());
            return redirect()->back()->with('error', 'Something went wrong');
        }
    }

    public function historyPage(Request $request)
    {
        $searchStatus = false;

        $query = Withdraw::where('customer_id', Auth::guard('customer')->user()->id);

        if ($request->filled('paymentDate')) {
            $searchStatus = true;
            $query->whereDate('created_at', $request->paymentDate);
        }

        if ($request->filled('status')) {
            $searchStatus = true;
            $query->where('status', $request->status);
        }

        if ($request->filled('searchTerm')) {
            $searchStatus = true;
            $query->where('identifier', 'like', '%' . $request->searchTerm . '%');
        }

        $withdrawals = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Minerportal/Withdraw/History', [
            'withdrawals' => $withdrawals,
            'searchStatus' => $searchStatus,
            'title' => 'Withdrawal History - ' . env('APP_NAME')
        ]);
    }
}
