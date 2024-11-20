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
        Schema::create('miner_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->decimal('price', 10, 2)->comment('in USDT');
            $table->decimal('hash_power', 10, 2)->comment('in GH/s');

            $table->decimal('output_per_minute', 10, 2)->comment('in USDT');
            $table->decimal('output_per_hour', 10, 2)->comment('in USDT');
            $table->decimal('output_per_day', 10, 2)->comment('in USDT');
            $table->integer('duration')->comment('in days');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('miner_plans');
    }
};
