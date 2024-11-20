import Layout from '../Layout';
import Helmet from 'react-helmet';
import { FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';

const VerifyEmail = ({ title, email }) => {
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [countdown, setCountdown] = useState(15);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const { data, setData, post } = useForm({
        email: email,
        otp: ''
    });

    useEffect(() => {
        let timer;
        if (countdownStarted && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setCanResend(true);
            setCountdownStarted(false);
        }
        return () => clearInterval(timer);
    }, [countdownStarted, countdown]);

    const handleSendOTP = async () => {
        try {
            setProcessing(true);
            const response = await axios.post(route('miners.send-otp'));
            
            if (response.data.success) {
                setShowOtpInput(true);
                setCountdownStarted(true);
                setCountdown(15);
                setCanResend(false);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        } finally {
            setProcessing(false);
        }
    };

    const handleVerifyOTP = () => {
        post(route('miners.verify-otp'));
    };

    const handleResendOTP = () => {
        if (canResend) {
            setCanResend(false);
            handleSendOTP();
        }
    };

    return (
        <Layout title="Verify Email" description="Verify Your Email" backHref={route('miners.dashboard')}>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <div className="min-h-screen p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto mt-8"
                >
                    <div className="card bg-base-100 shadow-xl border border-gray-200 relative">
                        {processing && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
                                <div className="loading loading-spinner loading-lg text-primary"></div>
                            </div>
                        )}
                        <div className="card-body items-center text-center p-8">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <FaEnvelope className="w-10 h-10 text-primary" />
                            </div>
                            
                            <h2 className="card-title text-xl font-mono text-primary font-bold mb-4">Verify Your Email Address</h2>
                            
                            <div className="form-control w-full max-w-md mb-4">
                                <label className="label">
                                    <span className="label-text">Your Email Address</span>
                                </label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    className="input input-bordered w-full" 
                                    disabled
                                />
                            </div>

                            {!showOtpInput ? (
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleSendOTP}
                                    disabled={processing}
                                >
                                    Send OTP
                                </button>
                            ) : (
                                <div className="w-full max-w-md">
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Enter OTP</span>
                                        </label>
                                        <input 
                                            type="text"
                                            value={data.otp}
                                            onChange={e => setData('otp', e.target.value)}
                                            className="input input-bordered text-gray-800"
                                            placeholder="Enter OTP"
                                        />
                                        {errors.otp && <span className="text-error text-sm mt-1 text-left">{errors.otp}</span>}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button 
                                            className="btn btn-primary"
                                            onClick={handleVerifyOTP}
                                            disabled={processing}
                                        >
                                            Verify OTP
                                        </button>
                                        
                                        {countdownStarted && !canResend && (
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="font-mono text-xl text-gray-800">
                                                    {countdown}s
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    You can resend OTP in {countdown} seconds
                                                </span>
                                            </div>
                                        )}

                                        {canResend && (
                                            <button 
                                                className="btn btn-outline"
                                                onClick={handleResendOTP}
                                                disabled={processing || !canResend}
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}

export default VerifyEmail;