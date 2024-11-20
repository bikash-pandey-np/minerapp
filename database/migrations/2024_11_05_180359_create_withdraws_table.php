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
        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->string('identifier')->unique();
            $table->foreignId('customer_id')->constrained('customers');
            $table->decimal('request_amount', 10, 2);
            $table->decimal('fee', 10, 2);
            $table->decimal('net_amount', 10, 2);
            $table->string('trc_20_wallet_address');
            $table->string('status')
                ->default('pending')
                ->comment('pending, processing, completed, rejected');
            $table->datetime('rejected_at')->nullable();
            $table->datetime('completed_at')->nullable();
            $table->datetime('processing_at')->nullable(); // Removed extra space
            $table->string('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraws');
    }
};
