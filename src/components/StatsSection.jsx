import React from 'react';
import {File, Shield, Wallet} from "lucide-react";

const StatsSection  = () => {
    return (
        <section>
            {/* Token Stats Section */}
            <div className="w-full max-w-screen-lg mx-auto py-16">
                <div className="grid grid-cols-1 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">$BOLT Token</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
                            The native token powering the next generation of decentralized applications.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Market Cap</p>
                                <p className="text-xl font-semibold text-black dark:text-white">$142.5M</p>
                            </div>
                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Circulating Supply</p>
                                <p className="text-xl font-semibold text-black dark:text-white">285.7M BOLT</p>
                            </div>
                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Total Supply</p>
                                <p className="text-xl font-semibold text-black dark:text-white">1B BOLT</p>
                            </div>
                            <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Current Price</p>
                                <p className="text-xl font-semibold text-black dark:text-white">$0.499</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-white font-medium
                                   transition-all duration-300 flex items-center gap-2">
                                <Wallet size={20}/>
                                Buy BOLT
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg text-white font-medium
                                   transition-all duration-300 flex items-center gap-2">
                                <File size={20}/>
                                Whitepaper
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-gray-300/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300 dark:border-gray-800">
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Contract Information</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Contract Address (ETH)</p>
                                    <p className="text-gray-600 dark:text-gray-300 font-mono text-sm">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                                </div>
                                <div className="flex items-center gap-2 text-blue-400">
                                    <Shield size={16}/>
                                    <span className="text-sm">Audited by Certik</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StatsSection;