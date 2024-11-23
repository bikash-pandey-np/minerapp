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
        Schema::create('miners', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->unique();

            $table->foreignId('customer_miner_transaction_id')->constrained('customer_miner_transactions');
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('miner_plan_id')->constrained('miner_plans');

            $table->decimal('hash_power', 10, 2)->comment('in GH/s');

            $table->boolean('is_active')->default(true);
            $table->decimal('investment_amount', 10, 2);

            $table->decimal('total_earned', 10, 4)->default(0.0000);

            $table->datetime('approved_at');
            $table->datetime('expires_at');

            $table->string('miner_name');

            $table->decimal('output_per_day', 10);
            $table->decimal('output_per_hour', 10);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('miners');
    }
};
