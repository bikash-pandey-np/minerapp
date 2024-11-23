import { useEffect, useState } from 'react';
import Layout from "../Layout";
import { useForm } from '@inertiajs/inertia-react';
import { motion } from 'framer-motion';
import { FaWallet, FaHistory } from 'react-icons/fa';
import Helmet from 'react-helmet';

const Index = ({balance, account_id, is_pro_account, withdrawal_fee, title}) => {
    console.log('from props', account_id);
    
    const [uiBalance, setUiBalance] = useState(balance);
    const { data, setData, post, processing, errors, reset } = useForm({
        trc_20_wallet_address: '',
        amount: ''
    });
    useEffect(() => {
        window.Echo.channel(`miner-balance-${account_id}`)
            .listen('.BroadcastBalanceEvent', (e) => {
                console.log('event received', e);
                setUiBalance(e.balance);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('miners.withdraw'), {
            onSuccess: () => {
                console.log('clearing form');
                reset(); // This will reset all form fields to their initial values
            }
        });
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and decimal point
        if (/^\d*\.?\d*$/.test(value) || value === '') {
            setData('amount', value);
        }
    };

    return (
        <Layout
            title="Withdraw"
            description="Withdraw Your Easy Earned Funds"
            backHref={route('miners.settings')}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="p-4 mb-32 md:mb-48">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="flex justify-end mb-4">
                        <a 
                            href={route('miners.withdraw-history')} 
                            className="btn btn-ghost btn-sm gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white  hover:bg-base-200"
                        >
                            <FaHistory className="w-4 h-4" />
                            Withdrawal History
                        </a>
                    </div>

                    <div className="stats shadow w-full mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <FaWallet className="w-8 h-8" />
                            </div>
                            <div className="stat-title">Available Balance</div>
                            <div className="stat-value text-primary">{Number(uiBalance).toFixed(2)} USDT</div>
                            <div className="stat-desc">Ready to withdraw</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300">
                        <div className="card-body p-8">
                            <motion.h2 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="card-title text-2xl font-bold mb-6 text-gray-800"
                            >
                                Withdraw Funds
                            </motion.h2>
                            
                            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg shadow-md border border-blue-100 mb-6">
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-semibold font-mono text-gray-500 italic">Withdrawal Fee:</span> <span className="font-mono text-gray-800">{withdrawal_fee} USDT</span>
                                        {is_pro_account && <span className="ml-2 badge badge-success">Pro Account Rate</span>}
                                    </div>
                                    <div className="text-sm text-gray-600 font-mono text-justify">
                                        <span className="font-semibold">Note:</span> The withdrawal fee will be deducted from your withdrawal amount. 
                                        The net amount you will receive is: <span className="font-semibold">Requested Amount - {withdrawal_fee} USDT</span>
                                    </div>
                                </div>
                            </div>

                            <motion.form 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <motion.div 
                                    className="form-control w-full"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <label className="label">
                                        <span className="label-text">TRC20 Wallet Address</span>
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="Enter your TRC20 wallet address"
                                        className={`input input-bordered text-gray-800 w-full shadow-sm ${errors.trc_20_wallet_address ? 'input-error' : ''}`}
                                        value={data.trc_20_wallet_address}
                                        onChange={e => setData('trc_20_wallet_address', e.target.value)}
                                    />
                                    {errors.trc_20_wallet_address && 
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.trc_20_wallet_address}</span>
                                        </label>
                                    }
                                </motion.div>

                                <motion.div 
                                    className="form-control w-full"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <label className="label">
                                        <span className="label-text">Amount</span>
                                    </label>
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        pattern="[0-9]*\.?[0-9]*"
                                        placeholder="Enter amount to withdraw"
                                        className={`input input-bordered w-full text-gray-800 shadow-sm ${errors.amount ? 'input-error' : ''}`}
                                        value={data.amount}
                                        onChange={handleAmountChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors.amount && 
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.amount}</span>
                                        </label>
                                    }
                                </motion.div>

                                <motion.div 
                                    className="card-actions justify-start"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <button 
                                        className="btn btn-primary btn-sm gap-2"
                                        disabled={processing}
                                    >
                                        <FaWallet className="w-4 h-4" />
                                        {processing ? 'Processing...' : 'Withdraw'}
                                    </button>
                                </motion.div>
                            </motion.form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    )
}   

export default Index;
