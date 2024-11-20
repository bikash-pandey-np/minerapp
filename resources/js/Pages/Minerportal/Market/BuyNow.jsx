import Layout from "../Layout";
import { useForm } from '@inertiajs/inertia-react';
import { useState, useEffect } from 'react';
import { IoCopy, IoWarning } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Helmet from 'react-helmet';

const BuyNow = ({ plans, selectedPlan: initialSelectedPlan, planAccountWalletAddress, title }) => {
    const [selectedPlan, setSelectedPlan] = useState(initialSelectedPlan);
    const { data, setData, post, processing, errors } = useForm({
        plan_id: selectedPlan ? selectedPlan.id : '',
        transaction_id: '',
        investment_amount: '',
    });

    const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('miners.buy-now'));
    };

    const copyToClipboard = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(planAccountWalletAddress)
                .then(() => {
                    toast.dismiss();
                    toast.success('Copied !', {
                        autoClose: 500,
                    });
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                    toast.dismiss();
                    toast.error('Failed to copy wallet address. Please try manually selecting and copying.', {
                        autoClose: 1000,
                    });
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = planAccountWalletAddress;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                toast.dismiss();
                toast.success('Copied !', {
                    autoClose: 500,
                });
            } catch (err) {
                console.error('Failed to copy: ', err);
                toast.dismiss();
                toast.error('Failed to copy wallet address. Please try manually selecting and copying.', {
                    autoClose: 1000,
                });
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <Layout title="Buy Now" description="Buy Now & Start Mining" backHref={route('miners.market')}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="p-4 mb-16 md:mb-20">
            <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="py-2">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="card bg-gray-700 text-secondary-content mb-8"
                            >
                                <div className="card-body">
                                    <h2 className="card-title text-sm">USDT TRC-20 Wallet Address</h2>
                                    <div className="bg-secondary-focus p-4 rounded-lg flex items-center justify-between">
                                        <code className="text-sm break-all tracking-wider">
                                            {planAccountWalletAddress}
                                        </code>
                                        <button 
                                            onClick={copyToClipboard} 
                                            className="btn btn-ghost btn-circle"
                                        >
                                            <IoCopy size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="collapse collapse-arrow bg-transparent"
                            >
                                <input 
                                    type="checkbox" 
                                    checked={isInstructionsOpen}
                                    onChange={() => setIsInstructionsOpen(!isInstructionsOpen)}
                                /> 
                                <div className="collapse-title text-md font-medium text-primary">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                                        Payment Instructions
                                    </h3>
                                </div>
                                <AnimatePresence>
                                    {isInstructionsOpen && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="collapse-content"
                                        >
                                            <ul className="steps steps-vertical">
                                                <li className="step step-secondary">
                                                    <div className="text-left ml-4">
                                                        <h4 className="font-semibold text-gray-600">Make Payment</h4>
                                                        <p className="text-sm text-gray-600">
                                                            Transfer the USDT amount using TRC20 network to the wallet address provided above. Double check the address before sending.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="step step-default">
                                                    <div className="text-left ml-4">
                                                        <h4 className="font-semibold text-gray-600">Copy Transaction Hash</h4>
                                                        <p className="text-sm text-gray-600">
                                                            After sending, copy your transaction hash (TXN) from your wallet or exchange platform.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="step step-default">
                                                    <div className="text-left ml-4">
                                                        <h4 className="font-semibold text-gray-600">Submit Details</h4>
                                                        <p className="text-sm text-gray-600">
                                                            Fill in the form below with your investment amount and transaction hash, then click 'Get Now'.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="step step-default">
                                                    <div className="text-left ml-4">
                                                        <h4 className="font-semibold text-gray-600">Await Confirmation</h4>
                                                        <p className="text-sm text-gray-600">
                                                            Your transaction will be verified shortly. Once confirmed, your mining plan will be activated automatically.
                                                        </p>
                                                    </div>
                                                </li>
                                                <li className="flex flex-col items-center"> 
                                                    <IoWarning className="w-10 h-10 text-amber-600 animate-pulse mb-2" />
                                                    <p className="text-sm text-amber-600 text-center">
                                                        Use only the TRC20 network for payments. If you use other networks like BEP20, your funds may be lost. We will not be held liable for any actions that lead to the loss of your funds.
                                                    </p>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <div className="relative">
                                {processing && (
                                    <div className="absolute inset-0 bg-base-200/50 backdrop-blur-sm flex items-center justify-center z-50">
                                        <div className="loading loading-spinner loading-lg text-primary"></div>
                                    </div>
                                )}
                                
                                <motion.form 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    onSubmit={handleSubmit} 
                                    className="card bg-base-200"
                                >
                                    <div className="card-body">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-md font-semibold">Select Plan</span>
                                            </label>
                                            <select
                                                className="select select-bordered select-primary w-full text-gray-800"
                                                value={data.plan_id}
                                                onChange={(e) => {
                                                    const newSelectedPlan = plans.find(plan => plan.id === parseInt(e.target.value));
                                                    setData('plan_id', e.target.value);
                                                    setSelectedPlan(newSelectedPlan);
                                                }}
                                            >
                                                <option value="">Select a plan</option>
                                                {plans.map((plan) => (
                                                    <option key={plan.id} value={plan.id}>
                                                        {plan.name} - Min. Investment: {plan.price} USDT
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.plan_id && <span className="text-error text-sm mt-1">{errors.plan_id}</span>}
                                        </div>

                                        {selectedPlan && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="alert">
                                                    <span>Please deposit minimum of <strong>{selectedPlan.price} USDT</strong></span>
                                                </div>
                                                
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-md font-semibold">Investment Amount (USDT)</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="input input-bordered input-primary text-gray-800"
                                                        value={data.investment_amount}
                                                        onChange={(e) => setData('investment_amount', e.target.value)}
                                                        placeholder="Enter investment amount"
                                                    />
                                                    {errors.investment_amount && <span className="text-error text-sm mt-1">{errors.investment_amount}</span>}
                                                </div>
                                            </motion.div>
                                        )}

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-md font-semibold">TXN Hash</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered input-primary text-gray-800"
                                                value={data.transaction_id}
                                                onChange={(e) => setData('transaction_id', e.target.value)}
                                                placeholder="Enter your transaction UUID"
                                            />
                                            {errors.transaction_id && <span className="text-error text-sm mt-1">{errors.transaction_id}</span>}
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                disabled={processing}
                                            >
                                                Get Now
                                            </button>
                                        </div>

                                      
                                    </div>
                                </motion.form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default BuyNow;