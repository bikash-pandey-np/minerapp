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
}
