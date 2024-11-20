import Layout from '../Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaHashtag, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useState } from 'react';
import Helmet from 'react-helmet';

const History = ({logs, title}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 1;

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed':
                return <FaCheckCircle className="text-green-500 text-xl" />;
            case 'failed':
                return <FaTimesCircle className="text-red-500 text-xl" />;
            case 'pending':
                return <FaSpinner className="text-yellow-500 text-xl animate-spin" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Calculate totals
    const pendingAmount = logs
        .filter(log => log.payment_status === 'pending')
        .reduce((sum, log) => sum + parseFloat(log.amount), 0);
        
    const approvedAmount = logs
        .filter(log => log.payment_status === 'completed')
        .reduce((sum, log) => sum + parseFloat(log.amount), 0);
        
    const failedAmount = logs
        .filter(log => log.payment_status === 'failed')
        .reduce((sum, log) => sum + parseFloat(log.amount), 0);

    // Pagination logic
    const totalPages = Math.ceil(logs.length / perPage);
    const indexOfLastLog = currentPage * perPage;
    const indexOfFirstLog = indexOfLastLog - perPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <Layout title="Payment History" description="View your payment history">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="max-w-4xl mx-auto px-4 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="stat bg-yellow-50 rounded-lg p-4 shadow-md"
                    >
                        <div className="stat-title text-yellow-600 flex items-center justify-center gap-2">
                            <FaSpinner className="animate-spin" />
                            Pending
                        </div>
                        <div className="stat-value text-yellow-700 text-sm text-center">{pendingAmount.toFixed(2)} USDT</div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="stat bg-green-50 rounded-lg p-4 shadow-md"
                    >
                        <div className="stat-title text-green-600 flex items-center justify-center gap-2">
                            <FaCheckCircle />
                            Approved
                        </div>
                        <div className="stat-value text-green-700 text-sm text-center">{approvedAmount.toFixed(2)} USDT</div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="stat bg-red-50 rounded-lg p-4 shadow-md"
                    >
                        <div className="stat-title text-red-600 flex items-center justify-center gap-2">
                            <FaTimesCircle />
                            Failed
                        </div>
                        <div className="stat-value text-red-700 text-sm text-center">{failedAmount.toFixed(2)} USDT</div>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        {currentLogs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="card-body">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <FaHashtag className="text-purple-500" />
                                                <span className="font-mono text-sm text-black">
                                                    Payment ID : {log.payment_identifier}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-purple-500" />
                                                <span className="text-sm text-black">
                                                    {log.payment_date}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <FaDollarSign className="text-purple-500" />
                                                <span className="font-semibold text-black">
                                                    {parseFloat(log.amount).toFixed(2)} USDT
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(log.payment_status)}`}>
                                                {getStatusIcon(log.payment_status)}
                                                <span className="capitalize text-sm font-medium">
                                                    {log.payment_status}
                                                </span>
                                            </div>
                                            <div className="text-xs text-black font-mono break-all">
                                                TXN HASH: {log.txn_id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {totalPages > 1 && (
                        <motion.div 
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="join">
                                <motion.button 
                                    className="join-item btn btn-sm"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    «
                                </motion.button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                        onClick={() => paginate(index + 1)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {index + 1}
                                    </motion.button>
                                ))}
                                <motion.button 
                                    className="join-item btn btn-sm"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    »
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default History;
