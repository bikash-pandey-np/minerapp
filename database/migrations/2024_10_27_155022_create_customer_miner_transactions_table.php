<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_miner_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_identifier')->unique();
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('miner_plan_id')->constrained('miner_plans');
            $table->string('txn_hash')->unique();
            $table->decimal('investment_amount', 10, 2)
                ->comment('in USDT');

            $table->boolean('is_approved')->default(false);
            $table->timestamp('approved_at')->nullable();

            $table->string('status')->default('pending')
                ->comment('pending, approved, rejected');

            $table->string('reject_reason')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_miner_transactions');
    }
};
