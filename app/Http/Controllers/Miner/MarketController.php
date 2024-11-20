<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\MinerPlan;
use Validator;

use App\Models\CustomerMinerTransaction;
use Illuminate\Support\Facades\Auth;
use Throwable;
use Illuminate\Support\Facades\Log;

class MarketController extends Controller
{
    public function index()
    {

        return Inertia::render('Minerportal/Market/Index', [
            'plans' => MinerPlan::where('is_active', true)->orderBy('price', 'asc')->get(),
            'title' => 'Market - ' . env('APP_NAME')
        ]);
    }

    public function buyNow(Request $request)
    {
        if($request->has('plan') && $request->plan != ''){
            $plan = MinerPlan::where('name', $request->plan)->first();
        }else{
            $plan = MinerPlan::where('is_active', true)->orderBy('price', 'asc')->first();
        }
        return Inertia::render('Minerportal/Market/BuyNow', [
            'plans' => MinerPlan::where('is_active', true)->orderBy('price', 'asc')->get(),
            'selectedPlan' => $plan,
            'planAccountWalletAddress' => env('PLAN_ACCOUNT_WALLET_ADDRESS'),
            'title' => 'Buy Now - ' . env('APP_NAME')
        ]);
    }

    public function buyNowPost(Request $request)
    {

        $rules = [
            'plan_id' => 'required|exists:miner_plans,id',
            'transaction_id' => 'required',
            'investment_amount' => 'required',
        ];

        $messages = [
            'plan_id.required' => 'The plan is required.',
            'plan_id.exists' => 'The selected plan is invalid.',
            'transaction_id.required' => 'Enter TXN Hash.',
            'investment_amount.required' => 'Enter Investment Amount.',
            'investment_amount.numeric' => 'Investment Amount must be a number.',
        ];

        $plan = MinerPlan::find($request->plan_id);

        if($plan)
        {
            $rules['investment_amount'] = 'required|numeric|min:'.$plan->price;
            $messages['investment_amount.min'] = 'Minimum Investment Amount is '.$plan->price.' USDT.';
        }

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);

            
        }

        try {
            CustomerMinerTransaction::create([
                'customer_id' => Auth::guard('customer')->user()->id,
                'miner_plan_id' => $request->plan_id,
                'txn_hash' => $request->transaction_id,
                'investment_amount' => $request->investment_amount,
            ]);

            return back()->with('success', 'Transaction Submitted Successfully.');
        } catch (Throwable $th) {

            Log::error('Error in MarketController@buyNowPost: '.$th->getMessage() . ' on line ' . $th->getLine());

            return back()->with('error', 'Something went wrong. Please try again later.');
        }
    }
}
