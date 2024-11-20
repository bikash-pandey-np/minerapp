import { useForm, Link } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Helmet from 'react-helmet';

const Register = ({title}) => {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('miners.register'));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-bold mb-6 text-center text-primary">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className={`input input-bordered input-primary w-full ${errors.full_name ? 'input-error' : ''}`}
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                            />
                            {errors.full_name && <span className="text-error text-sm mt-1">{errors.full_name}</span>}
                        </div>
                        <div className="form-control mt-4">
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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className={`input input-bordered input-primary w-full ${errors.password ? 'input-error' : ''}`}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <span className="text-error text-sm mt-1">{errors.password}</span>}
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text text-lg">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className={`input input-bordered input-primary w-full ${errors.password_confirmation ? 'input-error' : ''}`}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password_confirmation && <span className="text-error text-sm mt-1">{errors.password_confirmation}</span>}
                        </div>
                        <div className="form-control mt-8">
                            <button className="btn btn-primary btn-block text-lg" disabled={processing}>
                                {processing ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <div className="divider my-8">OR</div>
                    <div className="text-center">
                        <p className="text-sm">Already have an account?</p>
                        <Link href={route('miners.login')} className="btn btn-secondary btn-block mt-2">
                            Login Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
