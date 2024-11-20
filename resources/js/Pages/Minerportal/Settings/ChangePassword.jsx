import Layout from "../Layout";
import { useForm } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';
import { FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Helmet from 'react-helmet';
const ChangePassword = ({ errors, title }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing } = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('miners.change-password'), {
            onSuccess: () => {
                setData({
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                });
            }
        });
    };

    const formAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const inputAnimation = {
        focus: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <Layout title="Change Password" description="Change your account password securely"
            backHref={route('miners.settings')}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <motion.div
                className="max-w-xl mx-auto px-4 mb-[5rem] md:mb-[10rem]"
                initial="hidden"
                animate="visible"
                variants={formAnimation}
            >
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body relative">
                        {processing && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                                <FaKey className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="card-title text-2xl font-bold text-gray-700">Change Password</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Current Password</span>
                                </label>
                                <div className="relative">
                                    <motion.input
                                        variants={inputAnimation}
                                        whileFocus="focus"
                                        whileTap="tap"
                                        type={showCurrentPassword ? "text" : "password"}
                                        className={`input input-bordered text-gray-600 w-full pr-10 ${errors.current_password ? 'input-error' : ''}`}
                                        value={data.current_password}
                                        onChange={e => setData('current_password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </button>
                                </div>
                                {errors.current_password && <span className="text-error text-sm mt-1">{errors.current_password}</span>}
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">New Password</span>
                                </label>
                                <div className="relative">
                                    <motion.input
                                        variants={inputAnimation}
                                        whileFocus="focus"
                                        whileTap="tap"
                                        type={showNewPassword ? "text" : "password"}
                                        className={`input input-bordered text-gray-600 w-full pr-10 ${errors.new_password ? 'input-error' : ''}`}
                                        value={data.new_password}
                                        onChange={e => setData('new_password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </button>
                                </div>
                                {errors.new_password && <span className="text-error text-sm mt-1">{errors.new_password}</span>}
                            </div>

                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text">Confirm New Password</span>
                                </label>
                                <div className="relative">
                                    <motion.input
                                        variants={inputAnimation}
                                        whileFocus="focus"
                                        whileTap="tap"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={`input input-bordered text-gray-600 w-full pr-10 ${errors.new_password_confirmation ? 'input-error' : ''}`}
                                        value={data.new_password_confirmation}
                                        onChange={e => setData('new_password_confirmation', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                    </button>
                                </div>
                                {errors.new_password_confirmation && <span className="text-error text-sm mt-1">{errors.new_password_confirmation}</span>}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary w-full"
                                disabled={processing}
                            >
                                Update Password
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
}

export default ChangePassword;
