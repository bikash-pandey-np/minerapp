import Layout from '../Layout';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { BsCalendarDate, BsHash, BsCurrencyDollar, BsClock } from 'react-icons/bs';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import Helmet from 'react-helmet';

const History = ({ withdrawals, searchStatus, title }) => {
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterInputs, setFilterInputs] = useState({
        paymentDate: '',
        status: '',
        searchTerm: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

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
        setCurrentPage(1);
        Inertia.get(route('miners.withdraw-history'), filterInputs, {
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
        Inertia.get(route('miners.withdraw-history'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const openWithdrawalModal = (withdrawal) => {
        setSelectedWithdrawal(withdrawal);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeWithdrawalModal = () => {
        setShowModal(false);
        setSelectedWithdrawal(null);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeWithdrawalModal();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const withdrawalsArray = withdrawals || [];
    const currentItems = withdrawalsArray.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(withdrawalsArray.length / itemsPerPage);
    const totalRecords = withdrawalsArray.length;

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed':
                return <FaCheckCircle className="text-green-500 text-xl" />;
            case 'rejected':
                return <FaTimesCircle className="text-red-500 text-xl" />;
            case 'processing':
                return <FaSpinner className="text-blue-500 text-xl animate-spin" />;
            default:
                return <FaSpinner className="text-yellow-500 text-xl animate-spin" />;
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'badge-warning';
            case 'processing': return 'badge-info';
            case 'completed': return 'badge-success';
            case 'rejected': return 'badge-error';
            default: return 'badge-info';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Layout
            title="Withdrawal History"
            description="View Your Withdrawal History"
        >
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className={`container mx-auto px-4 mb-[7rem] md:mb-[15rem] ${showModal ? 'blur-sm' : ''}`}>
                <motion.div 
                    className="mb-6"
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
                                className="input input-bordered input-sm w-full text-gray-600"
                                value={filterInputs.paymentDate}
                                onChange={(e) => handleInputChange('paymentDate', e.target.value)}
                            />
                        </motion.div>

                        <motion.div 
                            className="form-control w-full"
                            variants={filterVariants}
                        >
                            <label className="label">
                                <span className="label-text">Status</span>
                            </label>
                            <select
                                className="select select-bordered select-sm w-full text-gray-600"
                                value={filterInputs.status}
                                onChange={(e) => handleInputChange('status', e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
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
                            <input
                                type="text"
                                className="input input-bordered input-sm w-full text-gray-600"
                                placeholder="Search by ID..."
                                value={filterInputs.searchTerm}
                                onChange={(e) => handleInputChange('searchTerm', e.target.value)}
                            />
                        </motion.div>

                        <motion.div 
                            className="form-control w-full flex flex-col justify-end"
                            variants={filterVariants}
                        >
                            <div className="flex gap-2 h-[30px]">
                                {searchStatus && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-error btn-outline btn-sm flex-1 min-h-0 h-full"
                                    onClick={resetSearch}
                                >
                                        Reset
                                    </motion.button>
                                )}
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

                {withdrawalsArray.length > 0 ? (
                    <>
                        <div className="text-sm text-gray-600 mb-4">
                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} records
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((withdrawal, index) => (
                                <motion.div
                                    key={withdrawal.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="card bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-300"
                                    onClick={() => openWithdrawalModal(withdrawal)}
                                >
                                    <div className="card-body">
                                        <h2 className="card-title text-lg font-mono text-gray-800">{withdrawal.identifier}</h2>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-500">
                                                {formatDate(withdrawal.created_at)}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-semibold text-gray-700">Request Amount:</span>
                                                <span className="font-mono text-gray-800">{withdrawal.request_amount} USDT</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-semibold text-gray-700">Fee:</span>
                                                <span className="font-mono text-red-500">-{withdrawal.fee} USDT</span>
                                            </div>
                                            <div className="flex justify-between items-center font-bold">
                                                <span className="text-sm text-gray-700">Net Amount:</span>
                                                <span className="font-mono text-green-600">{withdrawal.net_amount} USDT</span>
                                            </div>
                                            <div className="pt-2">
                                                <div className={`badge ${getStatusColor(withdrawal.status)} gap-2`}>
                                                    {withdrawal.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <div className="join">
                                    <button 
                                        className="join-item btn btn-sm"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        «
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button 
                                        className="join-item btn btn-sm"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-500 text-lg mb-4 font-mono">No records found</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => Inertia.visit(route('miners.withdraw'))}
                        >
                            Request Withdrawal
                        </motion.button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showModal && selectedWithdrawal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={closeWithdrawalModal}>
                        <motion.div 
                            className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Withdrawal Details</h3>
                                    <button 
                                        onClick={closeWithdrawalModal}
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
                                                <p className="text-sm text-gray-500">Withdrawal ID</p>
                                                <p className="font-mono font-medium text-gray-700">{selectedWithdrawal.identifier}</p>
                                            </div>
                                        </div>
                                        {getStatusIcon(selectedWithdrawal.status)}
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <HiOutlineReceiptRefund className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Wallet Address</p>
                                            <p className="font-mono font-medium break-all text-gray-700">
                                                {selectedWithdrawal.trc_20_wallet_address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <BsCurrencyDollar className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Amount Details</p>
                                            <div className="font-mono">
                                                <p className="text-gray-700">Request: {selectedWithdrawal.request_amount} USDT</p>
                                                <p className="text-red-500">Fee: -{selectedWithdrawal.fee} USDT</p>
                                                <p className="text-green-600 font-bold">Net: {selectedWithdrawal.net_amount} USDT</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <BsCalendarDate className="text-xl text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-500">Request Date</p>
                                            <p className="font-mono font-medium text-gray-700">
                                                {formatDate(selectedWithdrawal.created_at)}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedWithdrawal.completed_at && (
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <BsClock className="text-xl text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Completed Date</p>
                                                <p className="font-mono font-medium text-gray-700">
                                                    {formatDate(selectedWithdrawal.completed_at)}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedWithdrawal.remark && (
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-1">Remarks</p>
                                            <p className="font-medium text-gray-700">{selectedWithdrawal.remark}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 text-right">
                                    <button 
                                        onClick={closeWithdrawalModal}
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

export default History;