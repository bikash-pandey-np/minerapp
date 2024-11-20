<?php

namespace App\Http\Controllers\Miner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use Illuminate\Support\Facades\Validator;
use Throwable;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
class SettingController extends Controller
{

    public function index()
    {
        return Inertia::render('Minerportal/Settings/Index', [
            'system_info' => [
                'app_name' => env('APP_NAME'),
                'app_version' => env('APP_VERSION'),
                'app_description' => env('APP_DESCRIPTION'),
                'site_url' => env('SITE_URL')
            ],
            'title' => 'Settings - ' . env('APP_NAME')
        ]);
    }

    public function changePassword()
    {
        return Inertia::render('Minerportal/Settings/ChangePassword', [
            'title' => 'Change Password - ' . env('APP_NAME')
        ]);
    }

    public function handleChangePassword(Request $request)
    {
        $rules =[
            'current_password' => 'required',
            'new_password' => 'required|min:8',
            'new_password_confirmation' => 'required|same:new_password'
        ];

        $msg = [
            'current_password.required' => 'Enter Current Password',
            'new_password.required' => 'Enter New Password',
            'new_password.min' => 'Password must be at least 8 characters long',
            'new_password_confirmation.required' => 'Confirm New Password',
            'new_password_confirmation.same' => 'Password does not match'
        ];
        $validator = Validator::make($request->all(), $rules, $msg);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $customer = Customer::find(Auth::guard('customer')->user()->id);

        if(!(Hash::check($request->current_password, $customer->password)))
        {
            return redirect()->back()->with('error', 'Current password does not match');
        }

        //new password cannot be same as current password
        if(Hash::check($request->new_password, $customer->password))
        {
            return redirect()->back()->with('error', 'New password cannot be same as current password');
        }


        try{
            $customer->password = Hash::make($request->new_password);
            $customer->save();

            return back()->with('success', 'Password updated successfully');
        
        }
        catch(Throwable $th)
        {
            Log::error('Error At : Miner/SettingController@handleChangePassword'.  $th->getMessage() . ' on line ' . $th->getLine());
            return redirect()->back()->with('error', 'Something went wrong');
        }


        return redirect()->route('miners.settings')->with('success', 'Password updated successfully');
    }

    public function getProfile()
    {
        $profile = Customer::find(Auth::guard('customer')->user()->id);

        $profile->format_date = Carbon::parse($profile->created_at)->diffForHumans();
        return Inertia::render('Minerportal/Settings/Profile', [
            'profile' => $profile,
            'title' => 'My Profile - ' . env('APP_NAME')
        ]);
    }

    public function handleUpdateProfile(Request $request)
    {
        $update = false;

        $rules = [
            'full_name' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:5120',
        ];

        if (!Auth::guard('customer')->user()->is_email_verified) {
            $rules['email'] = 'required|email|unique:customers,email,' . Auth::guard('customer')->user()->id;
        }

        $msg = [
            'full_name.required' => 'Enter Full Name',
            'email.required' => 'Enter Email',
            'email.email' => 'Enter Valid Email',
            'email.unique' => 'Email already exists',
            'avatar.image' => 'Please select a valid image file',
            'avatar.max' => 'Image size should be less than 5MB',
        ];

        $validator = Validator::make($request->all(), $rules, $msg);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $customer = Customer::find(Auth::guard('customer')->user()->id);

        //if customer name is different from current name
        if ($customer->full_name !== $request->full_name) {
            $customer->full_name = $request->full_name;
            $update = true;
        }

        if (!Auth::guard('customer')->user()->is_email_verified) {

            if($customer->email !== $request->email){
                $customer->email = $request->email;
                $update = true;
            }
        }

        if($request->hasFile('avatar')){
            $customerFolder = 'public/'. $customer->account_id;
            if (!Storage::exists($customerFolder)) {
                Storage::makeDirectory($customerFolder);
            }
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $customer->account_id . '.' . $extension;
            $customer->avatar = $file->storeAs($customer->account_id, $filename, 'public');
            $update = true;
        }

        if ($update) {
            $customer->save();

            return back()->with('success', 'Profile updated successfully');
        }
        else{
            return back()->with('info', 'No changes made');
        }

    }
}
