<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\CustomerMinerTransaction;
use App\Models\Customer;
use App\Models\MinerPlan;
use Illuminate\Support\Str;

class Miner extends Model
{
    use HasFactory;

    protected $fillable = [
        'identifier',
        'customer_miner_transaction_id',
        'customer_id',
        'miner_plan_id',
        'hash_power',
        'is_active',
        'investment_amount',
        'approved_at',
        'expires_at',
        'miner_name',
        'output_per_day',
        'output_per_hour',
        'output_per_minute',
        'total_earned',
    ];

    protected $casts = [
        'output_per_day' => 'decimal:10',
        'output_per_hour' => 'decimal:10',
        'output_per_minute' => 'decimal:10',
        'hash_power' => 'decimal:10',
        'is_active' => 'boolean',
        'investment_amount' => 'decimal:10',
        'total_earned' => 'decimal:10',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($miner) {
            $miner->identifier = self::generateIdentifier();
        });
    }

    private static function generateIdentifier()
    {
        do {
            $identifier = Str::uuid();
        } while (self::where('identifier', $identifier)->exists());

        return $identifier;
    }

    public function customerMinerTransaction(): BelongsTo
    {
        return $this->belongsTo(CustomerMinerTransaction::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function minerPlan(): BelongsTo
    {
        return $this->belongsTo(MinerPlan::class);
    }

    public function getTotalEarnedAttribute($value)
    {
        return number_format($value, 4, '.', '');
    }
}
