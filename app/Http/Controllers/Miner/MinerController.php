<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Miner;
use Auth;
use Log;
use Throwable;
use Carbon\Carbon;
class MinerController extends Controller
{
    public function index()
    {
        $miners = Miner::with('minerPlan')
            ->where('customer_id', Auth::guard('customer')->id())
            ->orderBy('created_at', 'desc')
            ->get();

        $miners->each(function($miner) {
            $miner->new_expires_at = Carbon::parse($miner->expires_at)->format('M d, Y h:i:s A');
        });

        return Inertia::render('Minerportal/Miner/Index', [
            'miners' => $miners,
            'title' => 'Miners - ' . env('APP_NAME')
        ]);
    }

    public function logs($miner_id)
    {
        $miner = Miner::where('identifier', $miner_id)->first();

        $logs = $miner->minerEarningLogs()
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $minerInfo = [
            'identifier' => $miner->identifier,
            'miner_name' => $miner->miner_name,
            'hash_power' => $miner->hash_power,
            'investment_amount' => $miner->investment_amount,
            'total_earned' => $miner->total_earned,
            'expires_at' => $miner->expires_at
        ];

        return Inertia::render('Minerportal/Miner/Log', [
            'title' => 'Earning Logs - ' . env('APP_NAME'),
            'logs' => $logs,
            'miner' => $minerInfo
        ]);
    }
}
