import Layout from '../Layout';
import Helmet from 'react-helmet';
import { motion } from 'framer-motion';
import { FaBitcoin, FaServer, FaHashtag, FaDollarSign, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/inertia-react';

export default function Log({logs, title, miner}) {
    const { url } = usePage();

    const renderPaginationLinks = () => {
        const totalLinks = logs.links?.length - 2; // Exclude prev/next buttons
        const visibleLinks = [];
        
        // Add Previous button
        visibleLinks.push(
            <Link
                key="prev"
                href={logs.prev_page_url || ''}
                className={`btn btn-sm ${!logs.prev_page_url ? 'btn-disabled' : 'bg-base-300 hover:bg-base-200'} text-base-content gap-1`}
                preserveState
            >
                <FaChevronLeft className="w-3 h-3 md:hidden" />
                <span className="hidden md:inline">Prev</span>
            </Link>
        );

        // Add numbered links
        logs.links?.slice(1, -1).forEach((link, i) => {
            // Show only current page and adjacent pages on mobile
            const isCurrent = link.active;
            const isAdjacent = i === logs.current_page - 2 || i === logs.current_page;
            const showOnMobile = isCurrent || isAdjacent;
            
            // Show first 3, last 3, and current page on desktop
            const isFirstThree = i < 3;
            const isLastThree = i >= totalLinks - 3;
            const showOnDesktop = isFirstThree || isLastThree || isCurrent;
            
            if (showOnDesktop) {
                visibleLinks.push(
                    <Link
                        key={i}
                        href={link.url || ''}
                        className={`btn btn-sm ${link.active ? 
                            'bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90' : 
                            'bg-base-300 hover:bg-base-200 text-base-content'} ${!showOnMobile ? 'hidden md:inline-flex' : ''}`}
                        preserveState
                    >
                        {link.label.replace('...', '')}
                    </Link>
                );
            } else if (i === 3 && totalLinks > 6) {
                visibleLinks.push(<span key="ellipsis" className="px-2 text-base-content hidden md:inline">...</span>);
            }
        });

        // Add Next button
        visibleLinks.push(
            <Link
                key="next"
                href={logs.next_page_url || ''}
                className={`btn btn-sm ${!logs.next_page_url ? 'btn-disabled' : 'bg-base-300 hover:bg-base-200'} text-base-content gap-1`}
                preserveState
            >
                <span className="hidden md:inline">Next</span>
                <FaChevronRight className="w-3 h-3 md:hidden" />
            </Link>
        );

        return visibleLinks;
    };

    return (
        <Layout title="Earnings Logs"
            description="View How much you have earned from your mining rigs"
        >
            <Helmet>
                <title>{title}</title>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24 md:mb-40"
                >
                    <div className="lg:col-span-1 bg-base-200 rounded-xl p-6 shadow-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                                <FaServer className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-base-content font-mono">
                                    {miner.miner_name}
                                </h1>
                                <p className="text-base-content/70 text-sm font-mono">ID: {miner.identifier}</p>
                            </div>
                        </div>

                        <div className="space-y-4 font-mono">
                            <div className="p-4 bg-base-300 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-base-content/70">Total Earned</span>
                                    <span className="text-md font-bold text-primary">{miner.total_earned} USDT</span>
                                </div>
                            </div>

                            <div className="p-4 bg-base-300 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-base-content/70">Hash Power</span>
                                    <span className="text-md font-bold text-primary">{Number(miner.hash_power).toFixed(2)} TH/s</span>
                                </div>
                            </div>

                            <div className="p-4 bg-base-300 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-base-content/70">Investment</span>
                                    <span className="text-md font-bold text-primary">{Number(miner.investment_amount).toFixed(2)} USDT</span>
                                </div>
                            </div>

                            <div className="p-4 bg-base-300 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-base-content/70">Expires At</span>
                                    <span className="text-md font-bold text-primary">{miner.expires_at}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white-200 rounded-xl shadow-xl p-6"
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary font-mono">
                                Earning History
                            </h2>

                            <div className="overflow-x-auto font-mono">
                                <table className="table w-full">
                                    <thead className="bg-base-300">
                                        <tr>
                                            <th className="rounded-l-lg">Date & Time</th>
                                            <th>Amount (USDT)</th>
                                            <th className="rounded-r-lg">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-base-300">
                                        {logs.data?.map((log, index) => (
                                            <motion.tr 
                                                key={log.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 + (index * 0.05) }}
                                                className="hover:bg-base-300/50 transition-colors"
                                            >
                                                <td className="py-4 text-gray-800">{log.earned_at}</td>
                                                <td className="font-semibold text-primary">{Number(log.amount).toFixed(4)}</td>
                                                <td>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/20 text-success">
                                                        <span className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></span>
                                                        Success
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-wrap justify-center mt-6 gap-2">
                                {renderPaginationLinks()}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}