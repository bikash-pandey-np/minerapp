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
        Schema::create('customer_pro_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers');
            $table->string('payment_identifier')->unique();

            $table->string('txn_id')->unique();

            $table->timestamp('payment_date');
            $table->decimal('amount', 10, 2);
            $table->string('payment_status')
                ->default('pending')
                ->comment('pending, completed, failed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_pro_payments');
    }
};
