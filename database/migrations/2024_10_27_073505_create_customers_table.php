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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('account_id')->unique();
            $table->string('avatar')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('is_active')->default(true);
            $table->decimal('total_earned', 10, 2)->default(0.00);
            $table->decimal('balance', 10, 2)->default(0.00);



            $table->boolean('is_email_verified')->default(false);
            $table->timestamp('email_verified_at')->nullable();

            $table->boolean('is_pro_account')->default(false);
            $table->timestamp('pro_account_expiry')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
