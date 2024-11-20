<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CustomerMinerTransaction;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $minerTransactionSearchStatus = false;

        $query = CustomerMinerTransaction::with('minerPlan')
            ->where('customer_id', auth()->guard('customer')->user()->id);

        if ($request->filled('paymentDate')) {
            $minerTransactionSearchStatus = true;
            $query->whereDate('created_at', $request->paymentDate);
        }

        if ($request->filled('status')) {
            $minerTransactionSearchStatus = true;
            $query->where('status', $request->status);
        }

        if ($request->filled('searchTerm')) {
            $minerTransactionSearchStatus = true;
            $searchTerm = $request->searchTerm;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('transaction_identifier', 'like', "%{$searchTerm}%")
                    ->orWhere('txn_hash', 'like', "%{$searchTerm}%")
                    ->orWhereHas('minerPlan', function ($subQuery) use ($searchTerm) {
                        $subQuery->where('name', 'like', "%{$searchTerm}%");
                    });
            });
        }

        $minerTransactions = $query->latest()->get();

        return Inertia::render('Minerportal/Logs/Index', [
            'title' => 'Payment Logs - ' . env('APP_NAME'),
            'minerTransactions' => $minerTransactions,
            'filters' => $request->only(['paymentDate', 'status', 'searchTerm']),
            'isMinerTransactionSearched' => $minerTransactionSearchStatus
        ]);
    }
}
