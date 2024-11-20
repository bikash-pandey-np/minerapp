<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'error' => $request->session()->get('error'),
                'success' => $request->session()->get('success'),
                'info' => $request->session()->get('info'),
            ],
            'customer' => [
                'full_name' => Auth::guard('customer')->user()->full_name ?? null,
                'email' => Auth::guard('customer')->user()->email ?? null,
                'account_id' => Auth::guard('customer')->user()->account_id ?? null,
                'avatar' => Auth::guard('customer')->user()->avatar ?? null,
                'total_earned' => Auth::guard('customer')->user()->total_earned ?? null,
                'is_pro_account' => Auth::guard('customer')->user()->is_pro_account ?? null,
                'is_email_verified' => Auth::guard('customer')->user()->is_email_verified ?? null,
                'pro_account_expiry' => Auth::guard('customer')->check() ? Carbon::parse(Auth::guard('customer')->user()->pro_account_expiry)->format('M d, Y h:i:s A') : null,
            ],
        ]);
    }
}
