<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Miner;
use App\Models\Withdraw;
use App\Models\Customer;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $miner = [
            'invested' => number_format(Miner::where('customer_id', Auth::guard('customer')->user()->id)
            ->where('is_active', true)->sum('investment_amount'), 2, '.', ''),
            'count' => Miner::where('customer_id', Auth::guard('customer')->user()->id)
            ->where('is_active', true)->count(),
            'est_daily_earnings' => number_format(Miner::where('customer_id', Auth::guard('customer')->user()->id)
            ->where('is_active', true)->sum('output_per_day'), 2, '.', ''),
        ];

        $balance = number_format(Customer::where('id', Auth::guard('customer')->user()->id)->first()->balance, 2, '.', '');

        $withdrawals = [
            'pending' =>[
                'count' => Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'pending')->count(),
                'amount' => number_format(Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'pending')->sum('request_amount'), 2, '.', ''),
            ],
            'completed' => [
                'count' => Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'completed')->count(),
                'amount' => number_format(Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'completed')->sum('request_amount'), 2, '.', ''),
            ],
            'rejected' => [
                'count' => Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'rejected')->count(),
                'amount' => number_format(Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'rejected')->sum('request_amount'), 2, '.', ''),
            ],
            'processing' => [
                'count' => Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'processing')->count(),
                'amount' => number_format(Withdraw::where('customer_id', Auth::guard('customer')->user()->id)
                ->where('status', 'processing')->sum('request_amount'), 2, '.', ''),
            ],
        ];
        return Inertia::render('Minerportal/Dashboard', [
            'miner' => $miner,
            'withdrawals' => $withdrawals,
            'balance' => $balance,
            'title' => 'Dashboard - ' . env('APP_NAME')
        ]);
    }
}
