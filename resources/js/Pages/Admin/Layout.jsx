import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/inertia-react';
import { ToastContainer, toast } from 'react-toastify';
import { FiMenu, FiHome, FiUsers, FiLogOut, FiDollarSign } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { url } = usePage();

    const { flash } = usePage().props;

    const isActive = (path) => {
        return url.startsWith(path) ? 'bg-primary text-primary-content' : 'hover:bg-base-300';
    };

    useEffect(() => {
        if(flash.error){
            toast.dismiss();
            toast.error(flash.error);
        }

        if(flash.success){
            toast.dismiss();
            toast.success(flash.success);
        }
    }, [flash]);    

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of the system",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('admin.logout'));
            }
        });
    };

    const sidebarVariants = {
        open: { width: '16rem' },
        closed: { width: '5rem' }
    };

    const textVariants = {
        open: { opacity: 1, x: 0, display: 'block' },
        closed: { opacity: 0, x: -20, display: 'none' }
    };

    const iconVariants = {
        open: { scale: 1 },
        closed: { scale: 1.4 }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {/* Sidebar */}
            <motion.div 
                className="fixed top-0 left-0 h-full bg-gradient-to-b from-primary to-secondary shadow-xl"
                initial="open"
                animate={isSidebarOpen ? 'open' : 'closed'}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Header */}
                    <div className="p-4 border-b border-base-300/20">
                        <motion.button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="btn btn-square btn-ghost text-base-100"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FiMenu className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1">
                        <ul className="menu p-4 w-full text-base-100">
                            <li>
                                <Link 
                                    href={route('admin.dashboard')} 
                                    className={isActive('/admin/dashboard')}
                                >
                                    <motion.div
                                        variants={iconVariants}
                                        animate={isSidebarOpen ? 'open' : 'closed'}
                                    >
                                        <FiHome className="w-5 h-5" />
                                    </motion.div>
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                variants={textVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                            >
                                                Dashboard
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={'#'} 
                                    className={isActive('/admin/users')}
                                >
                                    <motion.div
                                        variants={iconVariants}
                                        animate={isSidebarOpen ? 'open' : 'closed'}
                                    >
                                        <FiUsers className="w-5 h-5" />
                                    </motion.div>
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                variants={textVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                            >
                                                Users
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={route('admin.planPayments')} 
                                    className={isActive('/admin/miner-payments')}
                                >
                                    <motion.div
                                        variants={iconVariants}
                                        animate={isSidebarOpen ? 'open' : 'closed'}
                                    >
                                        <FiDollarSign className="w-5 h-5" />
                                    </motion.div>
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                variants={textVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                            >
                                                Miner Payments
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* User Profile Section */}
                    <div className="p-4 border-t border-base-300/20">
                        <button 
                            onClick={handleLogout}
                            className="btn btn-ghost w-full justify-start text-base-100"
                        >
                            <motion.div
                                variants={iconVariants}
                                animate={isSidebarOpen ? 'open' : 'closed'}
                            >
                                <FiLogOut className="w-5 h-5" />
                            </motion.div>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        variants={textVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        Logout
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="ml-16"
                animate={{
                    marginLeft: isSidebarOpen ? '16rem' : '5rem'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </motion.div>

            <ToastContainer />
        </div>
    );
};

export default Layout;
