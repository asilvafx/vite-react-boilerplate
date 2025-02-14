import React from 'react';
import { Zap, Lock, Globe, Cpu } from 'lucide-react';

const FeaturesSection = () => {

    return (
        <section>
            <div className="max-w-screen-lg mx-auto py-16">
                <div className="flex gap-12 items-center">
               
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                Revolutionary Token Features
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Experience the next generation of decentralized finance with $BOLT's innovative features.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                                <p className="text-gray-400">Near-instant transactions with minimal gas fees across multiple chains.</p>
                            </div>

                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Lock className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Ultra Secure</h3>
                                <p className="text-gray-400">Military-grade encryption with multi-signature protection.</p>
                            </div>

                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Globe className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Cross-Chain</h3>
                                <p className="text-gray-400">Seamless integration across multiple blockchain networks.</p>
                            </div>

                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300/50 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Cpu className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
                                <p className="text-gray-400">Automated and secure transactions through smart contract technology.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;