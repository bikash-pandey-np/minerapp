import Layout from "../Layout";
import { useState } from "react";
import { IoCart } from "react-icons/io5";
import { motion } from "framer-motion";
import Helmet from 'react-helmet';

const Index = ({ plans, title }) => {
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

    const changeCurrentPlan = (direction) => {
        if (direction === 'left') {
            setCurrentPlanIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : plans.length - 1));
        } else {
            setCurrentPlanIndex((prevIndex) => (prevIndex < plans.length - 1 ? prevIndex + 1 : 0));
        }
    };

    return (
        <Layout title={title} description="Buy Miners and Boost your Mining Power">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8 mb-[8rem] md:mb-48">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 text-center">Miner Plans</h1>

                <div className="relative">
                    <div className="flex items-center justify-center">
                        <div className="w-96 mx-auto">
                            {plans.map((plan, index) => (
                                <div key={plan.id} className={`card bg-gradient-to-br from-blue-400 to-indigo-500 shadow-xl hover:shadow-2xl transition-all duration-300 w-full mx-auto transform hover:scale-105 ${index === currentPlanIndex ? 'block' : 'hidden'}`}>
                                    <div className="card-body text-white">
                                        <h2 className="card-title text-3xl font-bold">{plan.name}</h2>
                                        <p className="text-lg italic">{plan.description}</p>
                                        <div className="flex flex-col mt-6 bg-white bg-opacity-20 rounded-lg p-4 shadow">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="text-center">
                                                    <div className="text-sm font-semibold">Hash Power</div>
                                                    <div className="text-xl font-bold">{plan.hash_power} GH/s</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-semibold">Duration</div>
                                                    <div className="text-xl font-bold">{plan.duration} days</div>
                                                </div>
                                            </div>
                                            <div className="text-center mb-4">
                                                <div className="text-sm font-semibold">Min. Investment</div>
                                                <div className="text-2xl font-bold">{plan.price} <span className="text-sm text-white font-bold">USDT</span></div>
                                            </div>
                                            <div className="flex justify-between items-center bg-white bg-opacity-10 rounded p-3">
                                                <div className="text-center">
                                                    <div className="text-sm font-semibold">Per Minute</div>
                                                    <div className="text-lg font-bold">{plan.output_per_minute} <span className="text-xs">USDT</span></div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-semibold">Per Hour</div>
                                                    <div className="text-lg font-bold">{plan.output_per_hour} <span className="text-xs">USDT</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-actions justify-end mt-6">
                                            <a href={route('miners.buy-now', { plan: plan.name})} 
                                                className="btn btn-sm flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 border-0"
                                            >
                                                <IoCart />
                                                Buy Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-8 gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => changeCurrentPlan('left')} 
                            className="btn btn-circle bg-gradient-to-r from-indigo-400 to-purple-500 border-0 hover:from-indigo-500 hover:to-purple-600 shadow-lg"
                        >
                            ❮
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => changeCurrentPlan('right')} 
                            className="btn btn-circle bg-gradient-to-r from-purple-500 to-pink-400 border-0 hover:from-purple-600 hover:to-pink-500 shadow-lg"
                        >
                            ❯
                        </motion.button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;