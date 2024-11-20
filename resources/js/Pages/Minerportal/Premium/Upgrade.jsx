import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';
import { FaHashtag } from 'react-icons/fa';
import { FaCrown, FaRocket, FaChartLine, FaUserShield, FaWallet, FaCheckCircle, FaCopy, FaClock, FaCalendarAlt, FaSpinner, FaHistory } from 'react-icons/fa';
import Layout from '../Layout';
import { Inertia } from '@inertiajs/inertia';
import Helmet from 'react-helmet';
const Upgrade = ({is_pro_account, subscription_ends_at, walletAddress, has_pending_payment, latest_pending_payment, title}) => {

    const [showHistory, setShowHistory] = useState(false);

    console.log(subscription_ends_at);

    const { data, setData, post, processing, errors } = useForm({
        txn_hash: ''
    });

    useEffect(() => {
        document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('miners.get-pro'), {
            onSuccess: () => {
                setData('txn_hash', '');
            }
        });
    };

    const handleViewPaymentHistory = () => {
        Inertia.visit(route('miners.payment-history'));
    };
    
    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    alert('Wallet address copied to clipboard!');
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy wallet address. Please try manually selecting and copying.');
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                alert('Wallet address copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Failed to copy wallet address. Please try manually selecting and copying.');
            }
            document.body.removeChild(textArea);
        }
    };

    const truncateHash = (hash) => {
        if (hash.length <= 16) return hash;
        return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
    };

    const features = [
        {
            icon: FaRocket,
            title: 'Faster Mining Speed',
            description: 'Up to 2x faster mining speeds compared to regular accounts'
        },
        {
            icon: FaChartLine,
            title: 'Advanced Analytics',
            description: 'Detailed mining statistics and performance metrics'
        },
        {
            icon: FaUserShield,
            title: 'Priority Support',
            description: '24/7 dedicated customer support for premium users'
        },
        {
            icon: FaWallet,
            title: 'Higher Rewards',
            description: 'Earn up to 50% more rewards on your mining activities'
        }
    ];

    if (is_pro_account) {
        return (
            <Layout title="Account Status" description="View your premium account details">
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <FaCrown className="text-6xl text-yellow-400 mx-auto mb-4" />
                        </motion.div>
                        <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                            Premium Account Active
                        </h1>
                        <button
                            onClick={handleViewPaymentHistory}
                            className="btn btn-outline btn-primary mt-4"
                        >
                            <FaHistory className="mr-2" />
                            View Payment History
                        </button>
                    </div>

                    <motion.div 
                        className="card bg-base-100 shadow-xl"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <div className="card-body">
                            <div className="grid place-items-center">
                                <div className="w-full md:w-[500px] stat bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="stat-figure text-purple-600">
                                            <FaClock className="text-4xl animate-pulse" />
                                        </div>
                                        <div className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
                                            Premium
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="stat-title text-gray-600 font-medium text-center">Subscription Ends At</div>
                                        <div className="stat-value text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-2xl md:text-3xl font-bold text-center">
                                            {subscription_ends_at['date']}
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <div className="text-sm font-mono text-purple-700">
                                                {subscription_ends_at['time']} 
                                            </div>
                                            <div className="stat-desc flex items-center text-purple-600 font-semibold">
                                                <span className="inline-block animate-bounce mr-1">⏳</span>
                                                {subscription_ends_at['days_remaining']} days remaining
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Layout>
        );
    }

    if (has_pending_payment) {
        return (
            <Layout title="Account Status" description="Your premium account payment is being processed">
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <FaSpinner className="text-6xl text-purple-600 mx-auto mb-4" />
                        </motion.div>
                        <h1 className="text-xl font-mono font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Your Payment is Pending
                        </h1>
                    </div>

                    <motion.div 
                        className="card bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl border border-purple-100"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <div className="card-body">
                            <div className="text-center">
                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 mb-6 border border-purple-100">
                                    <div className="flex items-center justify-center space-x-2 font-mono text-purple-700">
                                        <FaHashtag className="text-lg flex-shrink-0" />
                                        <div className="flex flex-col">
                                            <span className="text-sm mb-2">
                                                Transaction Hash:
                                            </span>
                                            <span className="text-sm break-all">
                                                {truncateHash(latest_pending_payment.txn_id)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-lg font-medium text-gray-700">
                                        Your premium journey is about to begin! 
                                        <span className="block text-sm text-gray-500 mt-1">
                                            Processing time: 5-10 minutes
                                        </span>
                                    </p>

                                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                        <div className="px-6 py-3 bg-purple-100 rounded-full text-purple-700 font-semibold">
                                            <span className="mr-2">💎</span>
                                            {latest_pending_payment.amount} USDT
                                        </div>
                                        <div className="px-6 py-3 bg-pink-100 rounded-full text-pink-700 font-semibold">
                                            <span className="mr-2">📅</span>
                                            {latest_pending_payment.payment_date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Layout>
        );
    }

    return (
        <Layout title="Upgrade to Pro"
            description="Upgrade to Pro to unlock premium features and maximize your mining potential"
        >
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <FaCrown className="text-6xl text-yellow-400 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                        Upgrade to Premium
                    </h1>
                    <p className="text-gray-600">Unlock premium features and maximize your mining potential</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <div className="card-body text-center">
                                <feature.icon className="text-4xl text-purple-600 mb-4 mx-auto" />
                                <h2 className="card-title justify-center">{feature.title}</h2>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="card bg-base-100 shadow-xl mb-16" 
                    style={{ boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.3), 0 8px 10px -6px rgba(168, 85, 247, 0.3)' }}
                >
                    <div className="card-body">
                        <h2 className="card-title mb-4 text-gray-600 font-mono">Payment Details</h2>
                        <div className="bg-purple-100 p-4 rounded-lg mb-4">
                            <p className="text-center text-lg font-semibold text-purple-800">Premium Account Price: 99 USDT / month</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <p className="text-sm text-gray-600 mb-2">Send USDT (TRC20) to the following address:</p>
                            <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                                <div className="flex-1 break-all">
                                    <code className="text-[12px] sm:text-sm text-black">{walletAddress}</code>
                                </div>
                                <button 
                                    onClick={() => copyToClipboard(walletAddress)}
                                    className="btn btn-ghost btn-sm flex-shrink-0 ml-2"
                                >
                                    <FaCopy className="text-gray-600 hover:text-gray-800" />
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <form onSubmit={handleSubmit} className={processing ? 'blur-sm' : ''}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Transaction Hash</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`input input-bordered text-black ${errors.txn_hash ? 'input-error' : ''}`}
                                        value={data.txn_hash}
                                        onChange={e => setData('txn_hash', e.target.value)}
                                        placeholder="Enter your transaction hash"
                                        disabled={processing}
                                    />
                                    {errors.txn_hash && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.txn_hash}</span>
                                        </label>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-full"
                                        disabled={processing}
                                    >
                                        <FaCheckCircle className="mr-2" />
                                        Submit Transaction
                                    </button>
                                </div>
                            </form>
                            {processing && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="loading loading-spinner loading-lg text-primary"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Upgrade;
