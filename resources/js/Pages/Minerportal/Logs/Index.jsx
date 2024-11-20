import Layout from '../Layout';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { BsCalendarDate, BsHash, BsCurrencyDollar, BsClock } from 'react-icons/bs';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import Helmet from 'react-helmet';

const Index = ({ minerTransactions, filters, isMinerTransactionSearched, title }) => {
    const [activeTab, setActiveTab] = useState('miner');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterInputs, setFilterInputs] = useState({
        paymentDate: filters.paymentDate || '',
        status: filters.status || '',
        searchTerm: filters.searchTerm || ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.5
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        }
    };

    const filterVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleInputChange = (name, value) => {
        setFilterInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const applyFilters = () => {
        Inertia.get(route('miners.logs'), filterInputs, {
            preserveState: true,
            replace: true
        });
    };

    const resetSearch = () => {
        setFilterInputs({
            paymentDate: '',
            status: '',
            searchTerm: ''
        });
        Inertia.get(route('miners.logs'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const openTransactionModal = (transaction) => {
        console.log('modal opened')
        setSelectedTransaction(transaction);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeTransactionModal = () => {
        setShowModal(false);
        setSelectedTransaction(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeTransactionModal();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = minerTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(minerTransactions.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'approved':
                return <FaCheckCircle className="text-green-500 text-xl" />;
            case 'rejected':
                return <FaTimesCircle className="text-red-500 text-xl" />;
            default:
                return <FaSpinner className="text-yellow-500 text-xl animate-spin" />;
        }
    };

    return (
        <Layout title="Logs" description="View all logs">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className={`container mx-auto px-4 mb-[10rem] md:mb-[18rem] ${showModal ? 'blur-sm' : ''}`}>
                <motion.div 
                    className="tabs tabs-boxed mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <a
                        className={`tab ${activeTab === 'miner' ? 'bg-gradient-to-r from-purple-800 to-indigo-900 text-white' : ''}`}
                        onClick={() => setActiveTab('miner')}
                    >
                        Miner Transactions
                    </a>
                    <a
                        className={`tab ${activeTab === 'earning' ? 'bg-gradient-to-r from-purple-800 to-indigo-900 text-white' : ''}`}
                        onClick={() => setActiveTab('earning')}
                    >
                        Earning Logs
                    </a>
                </motion.div>
                <div className="mt-4 text-gray-700">
                    {activeTab === 'miner' && (
                        <div>
                            <motion.div 
                                className="mb-6 w-full"
                                variants={filterVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.4 }}
                            >
                                <motion.div 
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                    variants={filterVariants}
                                    transition={{ staggerChildren: 0.1 }}
                                >
                                    <motion.div 
                                        className="form-control w-full"
                                        variants={filterVariants}
                                    >
                                        <label className="label">
                                            <span className="label-text">Payment Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered input-sm w-full"
                                            value={filterInputs.paymentDate}
                                            onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                                        />
                                    </motion.div>
                                    <motion.div 
                                        className="form-control w-full"
                                        variants={filterVariants}
                                    >
                                        <label className="label">
                                            <span className="label-text">Payment Status</span>
                                        </label>
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={filterInputs.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                        >
                                            <option value="">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </motion.div>

                                    <motion.div 
                                        className="form-control w-full"
                                        variants={filterVariants}
                                    >
                                        <label className="label">
                                            <span className="label-text">Search</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="input input-bordered input-sm w-full"
                                                placeholder="Search transactions..."
                                                value={filterInputs.searchTerm}
                                                onChange={(e) => handleInputChange('searchTerm', e.target.value)}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="form-control w-full flex flex-col justify-end"
                                        variants={filterVariants}
                                    >
                                        <div className="flex gap-2 h-[30px]">
                                            <AnimatePresence>
                                                {isMinerTransactionSearched && (
                                                    <motion.button
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="btn btn-error btn-outline btn-sm flex-1 min-h-0 h-full hover:bg-error/20"
                                                        onClick={resetSearch}
                                                    >
                                                        Reset
                                                    </motion.button>
                                                )}
                                            </AnimatePresence>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="btn btn-primary btn-sm flex-1 min-h-0 h-full"
                                                onClick={applyFilters}
                                            >
                                                Apply
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            <div className="bg-base-200 p-4 rounded-lg mb-6">
                                <p className="text-sm text-gray-600">
                                    Showing {Math.min(currentItems.length, itemsPerPage)} Records from {minerTransactions.length} Records
                                </p>
                            </div>

                            {minerTransactions.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="card bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-300 p-8"
                                >
                                    <div className="text-center text-gray-600">
                                        <h3 className="text-xl font-semibold mb-2">No Data Found</h3>
                                        <p className="text-sm">There are no transactions to display.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentItems.map((transaction, index) => (
                                        <motion.div
                                            key={transaction.id}
                                            variants={cardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="card bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-300 border border-gray-100"
                                        >
                                            <div className="card-body">
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">Identifier:</span>
                                                    <span className="font-mono font-semibold"> {transaction.transaction_identifier}</span>
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">Amount:</span>
                                                    <span className="font-mono font-semibold"> {parseFloat(transaction.investment_amount).toFixed(2)} USDT</span>
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">TXN Hash:</span>
                                                    <span className="font-mono font-semibold"> {transaction.txn_hash}</span>
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">Status:</span>
                                                    <span className={`capitalize ${transaction.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                                                        &nbsp; {transaction.status}
                                                    </span>
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">Payment For:</span>
                                                    <span className="font-mono font-semibold">
                                                        &nbsp;{transaction.miner_plan.name} ({transaction.miner_plan.hash_power} GH/s)
                                                    </span>
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">Plan Duration :</span>
                                                    <span className="font-mono font-semibold">
                                                        &nbsp;{transaction.miner_plan.duration} days
                                                    </span>
                                                </p>
                                                <p className="text-sm mb-1">
                                                    <span className="font-medium">Date:</span>
                                                    <span className="font-mono font-semibold">
                                                        &nbsp;{new Date(transaction.created_at).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                                                    </span>
                                                </p>
                                                <div className="card-actions justify-end mt-4">
                                                    <motion.button 
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => openTransactionModal(transaction)}
                                                    >
                                                        View Details
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <div className="join">
                                        <button 
                                            className="join-item btn btn-sm"
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            «
                                        </button>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index}
                                                className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                                onClick={() => paginate(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button 
                                            className="join-item btn btn-sm"
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            »
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {activeTab === 'earning' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <p className="text-lg font-semibold">Earning logs coming soon!</p>
                        </motion.div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {showModal && selectedTransaction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeTransactionModal}>
                        <motion.div 
                            className="bg-white rounded-lg shadow-xl w-full max-w-2xl text-gray-800"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Transaction Details</h3>
                                    <button 
                                        onClick={closeTransactionModal}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <FaTimes className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <BsHash className="text-xl text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Transaction ID</p>
                                                <p className="font-mono font-medium">{selectedTransaction.transaction_identifier}</p>
                                            </div>
                                        </div>
                                        {getStatusIcon(selectedTransaction.status)}
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <HiOutlineReceiptRefund className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Transaction Hash</p>
                                            <p className="font-mono font-medium break-all">
                                                {selectedTransaction.txn_hash}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <BsCurrencyDollar className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Investment Amount</p>
                                            <p className="font-mono font-medium">{parseFloat(selectedTransaction.investment_amount).toFixed(2)} USDT</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <BsCalendarDate className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Transaction Date</p>
                                            <p className="font-mono font-medium">
                                                {new Date(selectedTransaction.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <BsClock className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Mining Plan</p>
                                            <p className="font-medium">
                                                {selectedTransaction.miner_plan.name} - {selectedTransaction.miner_plan.hash_power} GH/s
                                                <span className="text-sm text-gray-500 ml-2">
                                                    ({selectedTransaction.miner_plan.duration} days)
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <FaCheckCircle className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Status</p>
                                            <p className={`font-medium capitalize ${selectedTransaction.status === 'pending' ? 'text-yellow-500' : selectedTransaction.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                                                {selectedTransaction.status}
                                            </p>
                                        </div>
                                    </div>

                                   
                                </div>

                                <div className="mt-6 text-right">
                                    <button 
                                        onClick={closeTransactionModal}
                                        className="btn btn-sm bg-gray-200 hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Index;
