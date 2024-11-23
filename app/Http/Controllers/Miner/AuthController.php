<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;
use Illuminate\Support\Facades\Mail;
use App\Mail\Miner\VerifyEmailMail;
use App\Models\Otp;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login()
    {

        if(Auth::guard('customer')->check()){
            return redirect()->route('miners.dashboard')
                ->with('success', 'You are already logged in.');
        }

        return Inertia::render('Minerportal/Auth/Login', [
            'title' => 'Login - ' . env('APP_NAME')
        ]);
    }

    public function loginPost(Request $request)
    {

        $rules = [
            'email' => 'required|exists:customers,email',        
            'password' => 'required'
        ];

        $msg = [
            'email.required' => 'Enter email address.',
            'email.exists' => 'Email address does not exist.',
            'password.required' => 'Enter password.',
        ];

        $validator = Validator::make($request->all(), $rules, $msg);
        if($validator->fails()){
            return back()->withErrors($validator);
        }

        try{

            $customer = Customer::where('email', $request->email)->first();

            if(!$customer->is_active){

                return back()->with('error', 'Your account is not active. Please contact support.');
            }
            
            if(Auth::guard('customer')->attempt($request->only('email', 'password'))){
                return redirect()->route('miners.dashboard')->with('success', 'Login Successful !.');
            }

            return back()->with('error', 'Invalid email or password.');
        }

        catch(Throwable $e){
            Log::error('Error at AuthController@loginPost: '.$e->getMessage() . ' on line ' . $e->getLine());
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }

    }

    public function register()
    {
        if(Auth::guard('customer')->check()){
            return redirect()->route('miners.dashboard')
                ->with('success', 'You are already logged in.');
        }

        return Inertia::render('Minerportal/Auth/Register', [
            'title' => 'Register - ' . env('APP_NAME')
        ]);
    }

    public function registerPost(Request $request)
    {

        $rules = [
            'full_name' => 'required',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required|same:password',
        ];

        $msg = [
            'full_name.required' => 'Enter full name.',
            'email.required' => 'Enter email address.',
            'email.email' => 'Enter valid email address.',
            'email.unique' => 'Email address already exists.',
            'password.required' => 'Enter password.',
            'password.min' => 'Password must be at least 8 characters long.',
            'password_confirmation.required' => 'Confirm password.',
            'password_confirmation.same' => 'Password and confirm password do not match.',
        ];

        $validator = Validator::make($request->all(), $rules, $msg);
        if($validator->fails()){
            return back()->withErrors($validator);
        }


        try{
            $customer = Customer::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::guard('customer')->login($customer);
            return redirect()->route('miners.dashboard')->with('success', 'Registration Successful !.');
        }
        catch(Throwable $e){
            Log::error('Error at AuthController@registerPost: '.$e->getMessage() . ' on line ' . $e->getLine());
            return back()->withErrors(['error' => 'Something went wrong. Please try again.']);
        }

    }

    public function verifyEmailPage()
    {
        return Inertia::render('Minerportal/Auth/VerifyEmail', [
            'title' => 'Verify Email - ' . env('APP_NAME'),
            'email' => Auth::guard('customer')->user()->email
        ]);
    }

    public function sendOtp(Request $request)
    {
        $email = Auth::guard('customer')->user()->email;

        DB::beginTransaction();

        try{
            $otp = rand(100000, 999999);

            //check if otp is already sent for given email
            $lastOtp = Otp::where('email', $email)->first();

            if($lastOtp){
                $lastOtp->delete();
            }

            Otp::create([
                'email' => $email,
                'otp' => $otp,
                'sent_at' => now()
            ]);

            Log::info('OTP sent for '.$email . ' with otp '.$otp);

            // Mail::to($email)->send(new VerifyEmailMail([
            //     'otp' => $otp
            // ]));
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Otp sent successfully.'
            ]);
        }
        catch(Throwable $e){
            DB::rollBack();
            Log::error('Error at AuthController@sendOtp: '.$e->getMessage() . ' on line ' . $e->getLine());
            return response()->json([
                'success' => true,
                'message' => 'Something went wrong. Please try again.'
            ]);
        }
    }

    public function verifyOtp(Request $request)
    {

        $rules = [
            'otp' => 'required|size:6',
        ];

        $msg = [
            'otp.required' => 'Enter OTP.',
            'otp.size' => 'OTP must be 6 digits long.',
        ];

        $validator = Validator::make($request->all(), $rules, $msg);
        if($validator->fails()){
            return back()->withErrors($validator);
        }   

        $email = Auth::guard('customer')->user()->email;

        $otp = Otp::where('email', $email)->first();

        if(!$otp){
            Log::info('OTP not found for '.$email);
            return back()->with('error', 'OTP not found.');
        }

        $customer = Customer::where('email', $email)->first();


        if($otp->otp == $request->otp){

            $customer->is_email_verified = true;    
            $customer->email_verified_at = now();
            $customer->save();

            $otp->delete();
            Log::info('OTP verified successfully for '.$email);
            return redirect()->route('miners.dashboard')->with('success', 'OTP verified successfully.');
        }

        Log::info('Invalid OTP for '.$email);
        return back()->with('error', 'Invalid OTP.');
    }

    public function logout()
    {
        Auth::guard('customer')->logout();
        return redirect()->route('miners.login')->with('success', 'Logged out successfully.');
    }

}
