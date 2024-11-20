import { Link, usePage } from '@inertiajs/inertia-react';
import Layout from "../Layout";
import { FaUserCircle, FaKey, FaEnvelope, FaInfoCircle, FaTimes, FaCoins } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';

const Index = ({system_info, title}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { is_email_verified } = usePage().props.customer;

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const settingsLinks = [
        {
            title: 'My Profile',
            description: 'View and update your personal information',
            icon: FaUserCircle,
            href: route('miners.profile'),
            gradient: 'from-blue-500 to-purple-500'
        },
        {
            title: 'Withdraw',
            description: 'Withdraw your earnings',
            icon: FaCoins,
            href: route('miners.withdraw'),
            gradient: 'from-green-500 to-teal-500'
        },
        {
            title: 'Change Password',
            description: 'Update your account password',
            icon: FaKey,
            href: route('miners.change-password'),
            gradient: 'from-green-500 to-teal-500'
        },
        ...(!is_email_verified ? [{
            title: 'Verify Email',
            description: 'Verify your email address',
            icon: FaEnvelope,
            href: '#',
            gradient: 'from-orange-500 to-red-500'
        }] : []),
        {
            title: 'System Info',
            description: 'View system information and status',
            icon: FaInfoCircle,
            onClick: () => setIsModalOpen(true),
            gradient: 'from-purple-500 to-pink-500'
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { 
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <Layout title="Settings" description="Manage your settings">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <motion.div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-[10rem] md:mb-[15rem] ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}
                variants={container}
                initial="hidden"
                animate="show"
            >
                {is_email_verified && (
                    <motion.div
                        variants={item}
                        className="md:col-span-2"
                    >
                        <div className="alert alert-success shadow-lg">
                            <div className="flex items-center gap-2">
                                <FaEnvelope className="w-6 h-6 text-gray-200" />
                                <span className="text-gray-200 font-mono">Your email has been verified!</span>
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {settingsLinks.map((link, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                    >
                        {link.onClick ? (
                            <div
                                onClick={link.onClick}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden block cursor-pointer"
                            >
                                <div className={`card-body relative overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    <div className="flex items-center gap-4">
                                        <motion.div 
                                            className={`p-3 rounded-lg bg-gradient-to-r ${link.gradient}`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <link.icon className="w-6 h-6 text-white" />
                                        </motion.div>
                                        <div>
                                            <h2 className="card-title text-xl font-bold text-gray-600 tracking-wider">
                                                {link.title}
                                            </h2>
                                            <p className="text-gray-500 mt-1 tracking-wider">{link.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={link.href}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden block"
                            >
                                <div className={`card-body relative overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                    <div className="flex items-center gap-4">
                                        <motion.div 
                                            className={`p-3 rounded-lg bg-gradient-to-r ${link.gradient}`}
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <link.icon className="w-6 h-6 text-white" />
                                        </motion.div>
                                        <div>
                                            <h2 className="card-title text-xl font-bold text-gray-600 tracking-wider">
                                                {link.title}
                                            </h2>
                                            <p className="text-gray-500 mt-1 tracking-wider">{link.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 relative border border-gray-700 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <FaTimes className="w-6 h-6" />
                            </button>
                            
                            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">System Information</h2>
                            
                            <div className="space-y-6">
                                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200">
                                    <h3 className="text-lg font-semibold text-purple-300 font-mono mb-2">App Name</h3>
                                    <p className="text-gray-300 font-mono tracking-wide">{system_info.app_name}</p>
                                </div>
                                
                                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200">
                                    <h3 className="text-lg font-semibold text-purple-300 font-mono mb-2">Version</h3>
                                    <p className="text-gray-300 font-mono tracking-wide">{system_info.app_version}</p>
                                </div>
                                
                                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200">
                                    <h3 className="text-lg font-semibold text-purple-300 font-mono mb-2">Site Url</h3>
                                    <p className="text-gray-300 font-mono tracking-wide">{system_info.site_url}</p>
                                </div>

                                <div className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors duration-200">
                                    <h3 className="text-lg font-semibold text-purple-300 font-mono mb-2">Description</h3>
                                    <p className="text-gray-300 font-mono tracking-wide">{system_info.app_description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}

export default Index;
