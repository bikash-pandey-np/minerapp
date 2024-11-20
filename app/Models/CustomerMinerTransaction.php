<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Customer;
use App\Models\MinerPlan;
use Illuminate\Support\Str;
use App\Models\Miner;

class CustomerMinerTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_identifier',
        'customer_id',
        'miner_plan_id',
        'txn_hash',
        'investment_amount',
        'is_approved',
        'approved_at',
        'status',
        'reject_reason'
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function minerPlan(): BelongsTo
    {
        return $this->belongsTo(MinerPlan::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            $transaction->transaction_identifier = self::generateIdentifier();
        });
    }

    private static function generateIdentifier()
    {
        do {
            $identifier = Str::uuid();
        } while (self::where('transaction_identifier', $identifier)->exists());

        return $identifier;
    }

    public function miner()
    {
        return $this->hasOne(Miner::class);
    }
}
