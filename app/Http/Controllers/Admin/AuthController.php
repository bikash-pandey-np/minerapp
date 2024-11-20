<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(){
        return Inertia::render('Admin/Auth/Login');
    }

    public function handleLogin(Request $request){

        $request->validate([
            'email' => 'required|exists:users,email',
            'password' => 'required',
        ]);

        if(!Auth::attempt($request->only('email', 'password'))){
            return back()->with('error', 'Invalid credentials');
        }

        return redirect()->route('admin.dashboard')->with('success', 'Logged in successfully');
    }
}
