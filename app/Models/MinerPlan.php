<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CustomerMinerTransaction;
use App\Models\Miner;
class MinerPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'hash_power',
        'output_per_minute',
        'output_per_hour',
        'output_per_day',
        'duration',
        'is_active',
    ];


    public function minerTransactions()
    {
        return $this->hasMany(CustomerMinerTransaction::class);
    }

    public function miners()
    {
        return $this->hasMany(Miner::class);
    }

    
}
