<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function(){
    return Inertia::render('Admin/Dashboard');
})->name('dashboard');

Route::namespace('\App\Http\Controllers\Admin')->group(function(){
    Route::get('/login', 'AuthController@login')->name('login');
    Route::post('/login', 'AuthController@handleLogin');

    Route::prefix('miner-plan-payments')->group(function(){
        Route::get('/', 'MinerPlanPaymentController@index')->name('planPayments');

        Route::post('/approve', 'MinerPlanPaymentController@approve')->name('approvePayment');
        Route::post('/reject', 'MinerPlanPaymentController@reject')->name('rejectPayment');
    });
});
