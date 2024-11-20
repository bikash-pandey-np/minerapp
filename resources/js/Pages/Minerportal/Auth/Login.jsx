import React, { useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {


        if (flash.error) {
            toast.dismiss();
            toast.error(flash.error);
        }

        if(flash.success){
            toast.dismiss();
            toast.success(flash.success);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('miners.login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6 text-center text-primary">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`input input-bordered input-primary w-full ${errors.email ? 'input-error' : ''}`}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text text-lg">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className={`input input-bordered input-primary w-full ${errors.password ? 'input-error' : ''}`}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <span className="text-error text-sm mt-1">{errors.password}</span>}
                        </div>
                        <div className="form-control mt-8">
                            <button className="btn btn-primary btn-block text-lg" disabled={processing}>
                                {processing ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="divider my-8">OR</div>
                    <div className="text-center">
                        <a href="#" className="link link-hover text-primary">Forgot Password?</a>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm">Don't have an account?</p>
                        <Link href={route('miners.register')} className="btn btn-secondary btn-block mt-2">
                            Register Now
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;