<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Withdraw;
class WithdrawController extends Controller
{
    public function index(Request $request)
    {
        $searchStatus = false;

        $query = Withdraw::with('customer');

        if ($request->has('search')) {
            $searchStatus = true;
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('identifier', 'like', "%{$searchTerm}%");
            });
        }

        $logs = $query->orderBy('created_at', 'desc')
            ->paginate(2);

        return Inertia::render('Admin/Withdraw/Index', [
            'logs' => $logs,
            'searchStatus' => $searchStatus
        ]);
    }
    public function processWithdraw($identifier)
    {
        $withdraw = Withdraw::where('identifier', $identifier)->firstOrFail();
        
        // Update status to processing and set processing timestamp
        $withdraw->update([
            'status' => 'processing',
            'processing_at' => now()
        ]);

        return redirect()->back()->with('success', 'Withdrawal marked as processing');
    }

    public function completeWithdraw($identifier) 
    {
        $withdraw = Withdraw::where('identifier', $identifier)->firstOrFail();
        
        //only completed withdraw can be completed
        if($withdraw->status !== 'processing') {
            return redirect()->back()->with('error', 'Withdrawal is not in processing status');
        }
        // Update status to completed and set completion timestamp
        $withdraw->update([
            'status' => 'completed',
            'completed_at' => now()
        ]);

        return redirect()->back()->with('success', 'Withdrawal marked as completed');
    }

    public function rejectWithdraw(Request $request, $identifier)
    {
        $withdraw = Withdraw::where('identifier', $identifier)->firstOrFail();
        
        // Update status to rejected, set rejection timestamp and reason
        $withdraw->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'remark' => $request->reason
        ]);

        return redirect()->back()->with('success', 'Withdrawal has been rejected');
    }

}
