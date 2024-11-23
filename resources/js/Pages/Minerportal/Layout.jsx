import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { FaBarsStaggered, FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { GiMining } from "react-icons/gi";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdMarkEmailRead } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaHome, FaChartBar, FaCog, FaWallet, FaUserCircle, FaBars, FaBell, FaChevronRight, FaTimes, FaFileAlt, FaChartLine } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children, title, description, backHref }) => {

    const { flash } = usePage().props;
    const { customer } = usePage().props;

    console.log('Flash: ', flash);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const sidebarRef = useRef(null);
    const headerRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        document.body.style.overflow = !sidebarOpen ? 'hidden' : 'auto';
    };

    useEffect(() => {
        if (flash.error) {
            toast.dismiss();
            toast.error(flash.error);
        }
        if (flash.success) {
            toast.dismiss();
            toast.success(flash.success);
        }
        if (flash.info) {
            toast.dismiss();
            toast.info(flash.info);
        }
    }, [flash]);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 0) {
                        if (!isSticky) setIsSticky(true);
                    } else {
                        if (isSticky) setIsSticky(false);
                    }
                    lastScrollY = window.scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
                document.body.style.overflow = 'auto';
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        { icon: FaHome, label: 'Dashboard' },
        { icon: FaChartBar, label: 'Analytics' },
        { icon: FaWallet, label: 'Wallet' },
        { icon: FaCog, label: 'Settings' },
        { icon: FaUserCircle, label: 'Profile' },
        { icon: FaBell, label: 'Notifications' },
        { icon: FaChevronRight, label: 'More' },
    ];

    const homePageHeaderDesign = 'polygon(0 0, 100% 0, 100% 100%, 98.33% 97.58%, 96.67% 96.17%, 95% 94.58%, 93.33% 92.91%, 91.67% 91.27%, 90% 89.76%, 88.33% 88.47%, 86.67% 87.49%, 85% 86.88%, 83.33% 86.67%, 81.67% 86.88%, 80% 87.49%, 78.33% 88.47%, 76.67% 89.76%, 75% 91.27%, 73.33% 92.91%, 71.67% 94.58%, 70% 96.17%, 68.33% 97.58%, 66.67% 98.73%, 65% 99.53%, 63.33% 99.95%, 61.67% 99.95%, 60% 99.53%, 58.33% 98.73%, 56.67% 97.58%, 55% 96.17%, 53.33% 94.58%, 51.67% 92.91%, 50% 91.27%, 48.33% 89.76%, 46.67% 88.47%, 45% 87.49%, 43.33% 86.88%, 41.67% 86.67%, 40% 86.88%, 38.33% 87.49%, 36.67% 88.47%, 35% 89.76%, 33.33% 91.27%, 31.67% 92.91%, 30% 94.58%, 28.33% 96.17%, 26.67% 97.58%, 25% 98.73%, 23.33% 99.53%, 21.67% 99.95%, 20% 99.95%, 18.33% 99.53%, 16.67% 98.73%, 15% 97.58%, 13.33% 96.17%, 11.67% 94.58%, 10% 92.91%, 8.33% 91.27%, 6.67% 89.76%, 5% 88.47%, 3.33% 87.49%, 1.67% 86.88%, 0 86.67%)';


    return (
        <div className={`min-h-screen flex flex-col`} style={{
            color: '#ffffff'
        }}>

            <motion.header
                ref={headerRef}
                className={`bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 backdrop-blur-sm relative z-50 ${route().current() == 'miners.dashboard' ? '' : 'clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)'} ${isSticky ? 'sticky top-0' : ''}`}
                initial={false}
                animate={{
                    height: route().current() === 'miners.dashboard' ? '85px' :
                        (isSticky ? '85px' : '200px'),
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 1
                    }
                }}
                style={{
                    clipPath: route().current() == 'miners.dashboard' ?
                        homePageHeaderDesign :
                        null,
                }}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">

                        {route().current() == 'miners.dashboard' && (
                            <button onClick={toggleSidebar} className="mr-4 hover:text-purple-500 transition-colors duration-300">
                                <FaBarsStaggered className="h-6 w-6" />
                            </button>
                        )}

                        {route().current() != 'miners.dashboard' && (
                            <Link href={backHref ? backHref : route('miners.dashboard')} className="mr-4 hover:text-purple-500 transition-colors duration-300">
                                <IoChevronBackCircleSharp className="h-8 w-8" />
                            </Link>
                        )}

                        {route().current() == 'miners.dashboard' && (
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Miner App <sup className="text-xs text-white">1.0</sup>
                            </h1>
                        )}

                        {route().current() != 'miners.dashboard' && (
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wide">
                                {title}
                            </h1>
                        )}
                    </div>
                    <div className="flex items-center">
                        <div className="mr-6 relative">
                            <FaBell className="h-6 w-6 hover:text-purple-500 transition-colors duration-300" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                        </div>
                        <Link href={route('miners.profile')}>
                            <img src={customer.avatar} alt="User Avatar" className="rounded-full border-2 border-white h-[40px] w-[40px]" />
                        </Link>
                    </div>
                </div>


                {route().current() != 'miners.dashboard' && (
                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 1, height: 'auto' }}
                        animate={{
                            opacity: isSticky ? 0 : 1,
                            height: isSticky ? 0 : 'auto',
                            scale: isSticky ? 0.8 : 1,
                            y: isSticky ? -20 : 0
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <p className="text-center text-md text-gray-100 tracking-wide shadow-lg p-4 rounded-lg">{description}</p>
                    </motion.div>
                )}


            </motion.header>

            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                            onClick={toggleSidebar}
                        />
                        <motion.div
                            ref={sidebarRef}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-4 shadow-lg z-50 overflow-y-auto"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-end mb-4">
                                    <button onClick={toggleSidebar} className="hover:text-purple-500 transition-colors duration-300">
                                        <FaTimes className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mb-8 text-center">
                                    <img src={customer.avatar} alt="User Profile" className="rounded-full border-2 border-white mx-auto mb-4 h-[100px] w-[100px]" />
                                    <h2 className="text-xl font-bold">{customer.full_name}

                                        {customer.is_email_verified && (
                                            <span className="relative group">
                                                <MdMarkEmailRead className="inline-block text-green-500 ml-2" />
                                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Email Verified
                                                </span>
                                            </span>
                                        )}
                                        {customer.is_pro_account && (
                                            <span className="relative group">
                                                <VscVerifiedFilled className="inline-block text-green-500 ml-2" />
                                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    Premium Account
                                                </span>
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-sm text-gray-300">Account ID: {customer.account_id}</p>
                                </div>

                                {!customer.is_pro_account && (
                                    <div className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-center">
                                        <p className="font-bold mb-2">Upgrade to Premium</p>
                                        <Link href={route('miners.get-pro')} className="btn btn-sm btn-outline btn-white">Upgrade Now</Link>
                                    </div>
                                )}

                                {customer.is_pro_account && (
                                    <Link href={route('miners.get-pro')} className="mb-8 bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-lg text-center block">
                                        <p className="font-bold mb-2">Pro Account</p>
                                        <p className="text-sm">Expires: {new Date(customer.pro_account_expiry).toLocaleString()}</p>
                                    </Link>
                                )}
                                <nav className="flex-grow">
                                    {menuItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href="#"
                                            className="flex items-center py-2 px-4 hover:bg-purple-700 rounded transition-colors duration-300 mb-2"
                                        >
                                            <item.icon className="mr-3 h-5 w-5" />
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <main className={`flex-grow container mx-auto px-4 py-8 relative`}>
            {!customer.is_email_verified && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r shadow-lg">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <MdMarkEmailRead className="h-5 w-5 text-blue-400 animate-bounce" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                        Please verify your email address to ensure account security and access all features.
                                        <Link href={route('miners.verify-email')} className="font-medium underline hover:text-blue-600 ml-1">
                                            Verify now
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                {children}
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                    <Link href={route('miners.miner')} className="btn btn-circle btn-lg bg-gradient-to-r from-red-500 to-orange-300 border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300" style={{ boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.5), 0 8px 10px -6px rgba(253, 186, 116, 0.5)' }}>
                        <GiMining className="h-8 w-8 text-white" />
                    </Link>
                </div>
            </main>

            <nav className="btm-nav bg-gradient-to-r from-purple-800 to-indigo-900 text-white border-t border-white h-16 rounded-t-2xl flex items-center fixed bottom-0 left-0 right-0">
                <Link href={route('miners.dashboard')} className="hover:bg-purple-700 transition-colors duration-300 flex flex-col items-center justify-center h-full">
                    <FaHome className="h-6 w-6" />
                    <span className="btm-nav-label text-xs mt-1">Home</span>
                </Link>

                <Link href={route('miners.market')} className="hover:bg-purple-700 transition-colors duration-300 flex flex-col items-center justify-center h-full">
                    <FaChartLine className="h-6 w-6" />
                    <span className="btm-nav-label text-xs mt-1">Market</span>
                </Link>
                <div className="w-8"></div> {/* Spacer for center button */}
                <Link href={route('miners.logs')} className="hover:bg-purple-700 transition-colors duration-300 flex flex-col items-center justify-center h-full">
                    <FaFileAlt className="h-6 w-6" />
                    <span className="btm-nav-label text-xs mt-1">Logs</span>
                </Link>
                <Link href={route('miners.settings')} className="hover:bg-purple-700 transition-colors duration-300 flex flex-col items-center justify-center h-full">
                    <FaCog className="h-6 w-6" />
                    <span className="btm-nav-label text-xs mt-1">Settings</span>
                </Link>
            </nav>

            <ToastContainer />
        </div>
    );
};

export default Layout;
