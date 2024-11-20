import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '../Layout';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaHammer, FaShoppingCart, FaCoins } from 'react-icons/fa';
import { Link } from '@inertiajs/inertia-react';
import Helmet from 'react-helmet';

const Index = ({miners: initialMiners, title}) => {

    const {customer} = usePage().props;
    const [miners, setMiners] = useState(initialMiners);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        window.Echo.channel(`miner-${customer.account_id}`)
            .listen('.MinerTotalEarnedEvent', (e) => {
                console.log('event received', e);
                setMiners(prevMiners => {
                    return prevMiners.map(miner => {
                        if (miner.identifier === e.minerIdentifier) {
                            setAnimationKey(prev => prev + 1);
                            return {
                                ...miner,
                                total_earned: e.total_earned
                            };
                        }
                        return miner;
                    });
                });
            });
    }, []);

    return (
        <Layout
            title="Mining Rigs"
            description="Mining Rigs Dashboard"
        >
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="p-4 mb-20 md:mb-48">
                {miners.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {miners.map((miner) => (
                            <motion.div
                                key={miner.identifier}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="card bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100"
                            >
                                <div className="card-body p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            
                                            <h2 className="card-title text-xl font-bold text-gray-800">
                                                {miner.miner_plan.name} Plan
                                            </h2>
                                            {miner.is_active && (
                                                <motion.div
                                                    animate={{
                                                        rotateZ: [-45, 45],
                                                        y: [0, -10, 0]
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    className="text-primary hidden sm:block"
                                                >
                                                    <FaHammer className="h-6 w-6" />
                                                </motion.div>
                                            )}
                                        </div>
                                        <div className={`badge ${miner.is_active ? 'badge-success' : 'badge-error'} px-4 py-2`}>
                                            {miner.is_active ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="stat bg-gray-50 rounded-xl p-4 shadow-sm relative overflow-hidden">
                                            <div className="stat-title text-xs font-medium text-gray-600">Mined</div>
                                            <div className="stat-value text-primary text-xl font-bold flex items-center gap-2">
                                                <AnimatePresence mode="wait">
                                                    <motion.span
                                                        key={miner.total_earned}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {Number(miner.total_earned).toFixed(4)}
                                                    </motion.span>
                                                </AnimatePresence>
                                                <span className="text-xs text-gray-600">USDT</span>
                                                {miner.is_active && (
                                                    <motion.div
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            rotate: [0, 360],
                                                            opacity: [0.5, 1, 0.5]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
                                                        className="text-yellow-500 hidden sm:block"
                                                    >
                                                        <FaCoins className="h-4 w-4" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            {miner.is_active && (
                                                <motion.div 
                                                    key={animationKey}
                                                    className="absolute bottom-0 left-0 h-1 bg-primary"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{
                                                        duration: 60,
                                                        ease: "linear"
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <div className="stat bg-gray-50 rounded-xl p-4 shadow-sm">
                                            <div className="stat-title text-xs font-medium text-gray-600">Hash Power</div>
                                            <div className="stat-value text-secondary text-xl font-bold">{Number(miner.hash_power).toFixed(2)}</div>
                                            <div className="stat-desc text-gray-600">TH/s</div>
                                        </div>
                                    </div>

                                    <div className="divider my-4 text-gray-800">Mining Output</div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                                            <div className="font-semibold text-gray-700">Per Minute</div>
                                            <div className="text-accent font-medium mt-1">{Number(miner.output_per_minute).toFixed(4)} USDT</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                                            <div className="font-semibold text-gray-700">Per Hour</div>
                                            <div className="text-accent font-medium mt-1">{Number(miner.output_per_hour).toFixed(4)} USDT</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                                            <div className="font-semibold text-gray-700">Per Day</div>
                                            <div className="text-accent font-medium mt-1">{Number(miner.output_per_day).toFixed(4)} USDT</div>
                                        </div>
                                    </div>

                                    <div className="mt-6 text-sm text-gray-700 space-y-1">
                                        <div>Investment: <span className="font-bold text-gray-800">{Number(miner.investment_amount).toFixed(2)} USDT</span></div>
                                        <div>Expires: <span className="font-bold text-gray-800">{miner.new_expires_at}</span></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="card-body text-center p-8">
                            <h2 className="card-title text-2xl font-bold text-gray-800 justify-center mb-4">No Miners Found</h2>
                            <p className="text-gray-600 mb-6">Start earning passive income while you sleep!</p>
                            <div className="flex justify-center">
                                <Link
                                    href={route('miners.market')}
                                    className="btn btn-primary gap-2"
                                >
                                    <FaShoppingCart className="h-5 w-5" />
                                    Buy Your First Miner
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

export default Index;
