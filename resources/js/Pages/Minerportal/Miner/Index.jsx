import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from '../Layout';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FaHammer, FaShoppingCart, FaCoins, FaHistory } from 'react-icons/fa';
import { Link } from '@inertiajs/inertia-react';
import Helmet from 'react-helmet';

const Index = ({miners: initialMiners, title}) => {

    const {customer} = usePage().props;
    const [miners, setMiners] = useState(initialMiners);
    const [animationKey, setAnimationKey] = useState(0);
    useEffect(() => {
        console.log('subscribing to channel for account_id', customer.account_id);
        const channel = window.Echo.private(`miner-${customer.account_id}`);
    
        // Listener for MinerTotalEarnedEvent
        channel.listen('.MinerTotalEarnedEvent', (e) => {
            console.log('event received', e);
            setMiners((prevMiners) =>
                prevMiners.map((miner) =>
                    miner.identifier === e.minerIdentifier
                        ? {
                              ...miner,
                              total_earned: e.total_earned,
                          }
                        : miner
                )
            );
            setAnimationKey((prev) => prev + 1); // Trigger animation update
        });
    
        // Cleanup function to leave the channel and stop listening
        return () => {
            console.log('Cleaning up WebSocket channel');
            channel.stopListening('.MinerTotalEarnedEvent');
            window.Echo.leave(`miner-${customer.account_id}`);
        };
    }, [customer.account_id]); // Only re-subscribe when `account_id` changes
    
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {miners.map((miner) => (
                            <motion.div
                                key={miner.identifier}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="card bg-base-100 shadow-2xl hover:shadow-3xl border-2 border-base-300 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden"
                            >
                                <div className="card-body p-6">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary text-primary-content rounded-full w-12">
                                                        <span className="text-xl">{miner.miner_plan.name[0]}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="card-title text-xl font-bold text-base-content">
                                                        {miner.miner_plan.name} Plan
                                                    </h2>
                                                    <div className={`badge ${miner.is_active ? 'badge-success' : 'badge-error'} gap-2`}>
                                                        <div className={`w-2 h-2 rounded-full ${miner.is_active ? 'animate-pulse bg-success-content' : 'bg-error-content'}`}></div>
                                                        {miner.is_active ? 'Active' : 'Inactive'}
                                                    </div>
                                                </div>
                                            </div>
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
                                                    className="text-primary"
                                                >
                                                    <FaHammer className="h-6 w-6" />
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200/50 backdrop-blur-sm w-full">
                                            <div className="stat">
                                                <div className="stat-title">Mined</div>
                                                <div className="stat-value text-primary flex items-center gap-2 text-lg">
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
                                                    <span className="text-xs">USDT</span>
                                                    {miner.is_active && (
                                                        <motion.div
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                rotate: [0, 360],
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "linear"
                                                            }}
                                                            className="text-warning"
                                                        >
                                                            <FaCoins className="h-4 w-4" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="stat">
                                                <div className="stat-title">Hash Power</div>
                                                <div className="stat-value text-secondary text-lg">{Number(miner.hash_power).toFixed(2)}</div>
                                                <div className="stat-desc">TH/s</div>
                                            </div>
                                        </div>

                                        <div className="divider text-gray-500">Mining Output</div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="stats bg-base-200/50 backdrop-blur-sm shadow">
                                                <div className="stat">
                                                    <div className="stat-title">Per Hour</div>
                                                    <div className="stat-value text-accent text-lg">{Number(miner.output_per_hour).toFixed(4)}</div>
                                                    <div className="stat-desc">USDT</div>
                                                </div>
                                            </div>
                                            
                                            <div className="stats bg-base-200/50 backdrop-blur-sm shadow">
                                                <div className="stat">
                                                    <div className="stat-title">Per Day</div>
                                                    <div className="stat-value text-accent text-lg">{Number(miner.output_per_day).toFixed(4)}</div>
                                                    <div className="stat-desc">USDT</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-4">
                                            <div className="flex justify-between">
                                                <span className="text-base-content/70">Investment:</span>
                                                <span className="font-bold text-base-content">{Number(miner.investment_amount).toFixed(2)} USDT</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-base-content/70">Expires:</span>
                                                <span className="font-bold text-base-content">{miner.new_expires_at}</span>
                                            </div>
                                        </div>

                                        {miner.is_active && (
                                            <motion.div 
                                                key={animationKey}
                                                className="h-1 bg-primary rounded-full mt-4"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{
                                                    duration: 60*60,
                                                    ease: "linear"
                                                }}
                                            />
                                        )}

                                        <motion.div
                                            className="flex justify-center mt-4"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href={route('miners.miner-logs', {miner_id: miner.identifier})}
                                                className="btn btn-sm bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white border-0 gap-1 px-4"
                                            >
                                                <FaHistory className="h-3 w-3" />
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-xs"
                                                >
                                                    View Logs
                                                </motion.span>
                                            </Link>
                                        </motion.div>
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
                        className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="card-body text-center p-8">
                            <h2 className="card-title text-2xl font-bold justify-center mb-4">No Miners Found</h2>
                            <p className="text-base-content/70 mb-6">Start earning passive income while you sleep!</p>
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
