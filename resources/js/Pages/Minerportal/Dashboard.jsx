import Layout from "./Layout";
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaWallet, FaMicrochip } from 'react-icons/fa';
import { MdMarkEmailRead } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Dashboard = ({ miner, withdrawals, balance, title }) => {

    const containerVariants = {
        hidden: { opacity: 0, transform: 'translateY(20px)' },
        visible: { 
            opacity: 1,
            transform: 'translateY(0px)',
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, transform: 'translateY(20px)' },
        visible: { opacity: 1, transform: 'translateY(0px)' }
    };

    return (
        <Layout>
            <Helmet> 
                <title>{title}</title>
            </Helmet>
            <motion.div 
                className="container mx-auto px-4 py-8 font-mono mb-[6rem] md:mb-[12rem]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ willChange: 'transform' }}
            >

               

                {/* Balance Section */}
                <motion.div className="mb-8" variants={itemVariants} style={{ willChange: 'transform' }}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Balance</h2>
                    <div className="stat bg-base-100 shadow-xl rounded-lg w-full md:w-1/2 lg:w-1/3 hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                        <div className="stat-figure text-primary">
                            <FaWallet className="w-8 h-8" style={{ animation: 'bounce 1s infinite', willChange: 'transform' }} />
                        </div>
                        <div className="stat-title">Current Balance</div>
                        <div className="stat-value text-primary">{balance} <span className="text-xs">USDT</span></div>
                        <div className="stat-desc">Available for withdrawal</div>
                    </div>
                </motion.div>

                {/* Miner Statistics */}
                <motion.div className="mb-8" variants={itemVariants} style={{ willChange: 'transform' }}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Miner Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="stat bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                            <div className="stat-figure text-primary">
                                <FaMicrochip className="w-8 h-8" style={{ animation: 'pulse 2s infinite', willChange: 'transform' }} />
                            </div>
                            <div className="stat-title">Active Miners</div>
                            <div className="stat-value text-primary">{miner.count}</div>
                            <div className="stat-desc font-semibold">Invested <span className="text-gray-700">{miner.invested}</span> <span className="text-xs"> USDT</span></div>
                        </div>

                        <div className="stat bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                            <div className="stat-figure text-secondary">
                                <FaWallet className="w-8 h-8" style={{ animation: 'pulse 2s infinite', willChange: 'transform' }} />
                            </div>
                            <div className="stat-title">Est. Daily Earnings</div>
                            <div className="stat-value text-secondary">{miner.est_daily_earnings} <span className="text-xs">USDT</span></div>
                            <div className="stat-desc">Per Day</div>
                        </div>
                    </div>
                </motion.div>

                {/* Withdrawal Statistics */}
                <motion.div variants={itemVariants} style={{ willChange: 'transform' }}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Withdrawal Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <motion.div 
                            className="stat bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            style={{ willChange: 'transform' }}
                        >
                            <div className="stat-figure text-warning">
                                <FaHourglassHalf className="w-8 h-8" style={{ animation: 'pulse 2s infinite', willChange: 'transform' }} />
                            </div>
                            <div className="stat-title">Pending</div>
                            <div className="stat-value text-warning">{withdrawals.pending.count}</div>
                            <div className="stat-desc">{withdrawals.pending.amount} USDT</div>
                        </motion.div>

                        <motion.div 
                            className="stat bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            style={{ willChange: 'transform' }}
                        >
                            <div className="stat-figure text-info">
                                <FaSpinner className="w-8 h-8" style={{ animation: 'spin 1s linear infinite', willChange: 'transform' }} />
                            </div>
                            <div className="stat-title">Processing</div>
                            <div className="stat-value text-info">{withdrawals.processing.count}</div>
                            <div className="stat-desc">{withdrawals.processing.amount} USDT</div>
                        </motion.div>

                        <motion.div 
                            className="stat bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            style={{ willChange: 'transform' }}
                        >
                            <div className="stat-figure text-success">
                                <FaCheckCircle className="w-8 h-8" style={{ animation: 'pulse 2s infinite', willChange: 'transform' }} />
                            </div>
                            <div className="stat-title">Completed</div>
                            <div className="stat-value text-success">{withdrawals.completed.count}</div>
                            <div className="stat-desc">{withdrawals.completed.amount} USDT</div>
                        </motion.div>

                        <motion.div 
                            className="stat bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            style={{ willChange: 'transform' }}
                        >
                            <div className="stat-figure text-error">
                                <FaTimesCircle className="w-8 h-8" style={{ animation: 'pulse 2s infinite', willChange: 'transform' }} />
                            </div>
                            <div className="stat-title">Rejected</div>
                            <div className="stat-value text-error">{withdrawals.rejected.count}</div>
                            <div className="stat-desc">{withdrawals.rejected.amount} USDT</div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    );
};

export default Dashboard;
