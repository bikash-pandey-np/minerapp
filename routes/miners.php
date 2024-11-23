<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Events\MinerTotalEarnedEvent;


// Route::get('/', function(){
//     return Inertia::render('Test');
// })->name('dashboard');

Route::namespace('\App\Http\Controllers\Miner')->group(function(){
    Route::prefix('login')->group(function(){
        Route::get('/', 'AuthController@login')->name('login');
        Route::post('/', 'AuthController@loginPost');
    });

    Route::prefix('register')->group(function(){
        Route::get('/', 'AuthController@register')->name('register');
        Route::post('/', 'AuthController@registerPost');
    });
    
    Route::middleware('customer')->group(function(){
        Route::post('/logout', 'AuthController@logout')->name('logout');
        Route::get('/', 'DashboardController@index')->name('dashboard');

        Route::get('/verify-email', 'AuthController@verifyEmailPage')->name('verify-email');

        Route::post('/verify-email', 'AuthController@sendOtp')->name('send-otp');

        Route::post('/verify-otp', 'AuthController@verifyOtp')->name('verify-otp');
        Route::get('/market', 'MarketController@index')->name('market');

        Route::prefix('buy-now')->group(function(){
            Route::get('/', 'MarketController@buyNow')->name('buy-now');
            Route::post('/', 'MarketController@buyNowPost');
        });


        Route::prefix('logs')->group(function(){
            Route::get('/', 'LogController@index')->name('logs');
        });

        Route::get('/get-premium', 'UpgradeAccountController@index')->name('get-pro');
        Route::post('/get-premium', 'UpgradeAccountController@handleUpgrade');
        Route::get('/payment-history', 'UpgradeAccountController@history')->name('payment-history');

        Route::get('/settings', 'SettingController@index')->name('settings');

        Route::prefix('profile')->group(function(){
            Route::get('/', 'SettingController@getProfile')->name('profile');
            Route::post('/', 'SettingController@handleUpdateProfile');
        });

        Route::prefix('change-password')->group(function(){
            Route::get('/', 'SettingController@changePassword')->name('change-password');
            Route::post('/', 'SettingController@handleChangePassword');
        });

        Route::prefix('miner')->group(function(){
            Route::get('/', 'MinerController@index')->name('miner');
            Route::get('/logs/{miner_id}', 'MinerController@logs')->name('miner-logs');
        });

        Route::prefix('withdraw')->group(function(){
            Route::get('/', 'WithdrawController@index')->name('withdraw');
            Route::post('/', 'WithdrawController@handleWithdraw');

            Route::get('/history', 'WithdrawController@historyPage')
                ->name('withdraw-history');
        });
        
    });
});
