<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use Illuminate\Support\Str;
class CustomerProPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'payment_identifier',
        'txn_id',
        'payment_date',
        'amount',
        'payment_status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($customerProPayment) {
            $customerProPayment->payment_identifier = self::generateUniquePaymentIdentifier();
        });
    }

    private static function generateUniquePaymentIdentifier()
    {
        do {
            // Generate a random 10 character string (9 numbers + 1 letter)
            $payment_identifier = mt_rand(100000000, 999999999) . strtoupper(Str::random(1));
        } while (self::where('payment_identifier', $payment_identifier)->exists());

        return $payment_identifier;
    }

}
