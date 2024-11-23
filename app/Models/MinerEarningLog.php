<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Miner;
use App\Models\Customer;

class MinerEarningLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'miner_id',
        'customer_id',
        'amount',
        'earned_at',
    ];


    public function miner()
    {
        return $this->belongsTo(Miner::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
