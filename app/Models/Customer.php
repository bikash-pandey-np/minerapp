<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
use App\Models\CustomerProPayment;
use App\Models\CustomerMinerTransaction;
use App\Models\Miner;
use App\Models\Withdraw;

class Customer extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'is_active',
        'total_earned',
        'is_email_verified',
        'email_verified_at',
        'account_id', 
        'avatar',
        'is_pro_account',
        'pro_account_expiry',
        'balance',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'total_earned' => 'decimal:2',
        'is_email_verified' => 'boolean',
        'is_pro_account' => 'boolean',
        'pro_account_expiry' => 'datetime',
    ];

    public function proPayments()
    {
        return $this->hasMany(CustomerProPayment::class);
    }

    public function minerTransactions()
    {
        return $this->hasMany(CustomerMinerTransaction::class);
    }

    public function withdraws()
    {
        return $this->hasMany(Withdraw::class);
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($customer) {
            $customer->account_id = self::generateUniqueAccountId();
        });
    }

    private static function generateUniqueAccountId()
    {
        do {
            // Generate a random 10 character string (9 numbers + 1 letter)
            $account_id = mt_rand(100000000, 999999999) . strtoupper(Str::random(1));
        } while (self::where('account_id', $account_id)->exists());

        return $account_id;
    }

    public function getAvatarAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('storage/customer_default_avatar.png');
    }

    public function miners()
    {
        return $this->hasMany(Miner::class);
    }
}
