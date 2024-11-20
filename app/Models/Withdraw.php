<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use Illuminate\Support\Str;

class Withdraw extends Model
{
    use HasFactory;

    protected $fillable = [
        'identifier',
        'customer_id',
        'request_amount',
        'fee',
        'net_amount',
        'trc_20_wallet_address',
        'status',
        'rejected_at',
        'completed_at',
        'processing_at',
        'remark',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public static function boot()
    {
        parent::boot();

        static::creating(function ($withdraw) {
            $withdraw->identifier = self::generateIdentifier();
        });
    }


    private static function generateIdentifier()
    {
        do {
            $identifier = 'WD' . mt_rand(100000000, 999999999) . strtoupper(Str::random(1));
        } while (self::where('identifier', $identifier)->exists());

        return $identifier;
    }
}
