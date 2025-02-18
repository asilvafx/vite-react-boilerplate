import React from 'react';
import {File, Shield, Rocket} from "lucide-react";
import {Button} from 'flowbite-react';
import {Link} from 'react-router-dom';

const StatsSection  = () => {
    return (
        <section>
            {/* Token Stats Section */}
            <div className="w-full max-w-screen-lg mx-auto py-16">
                <div className="premium-panel px-8 py-10 rounded-lg grid grid-cols-1 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold mb-4 neon-text-intense bg-clip-text">$BOLT
                            Token</h2>
                        <p className="text-gray-400 text-lg max-w-md">
                            The native token powering the next generation of decentralized applications.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="premium-panel p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Blockchain</p>
                                <p className="text-xl font-semibold text-white">Polygon PoS</p>
                            </div>
                            <div className="premium-panel p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Contract</p>
                                <p className="text-xl font-semibold text-white">ERC-20</p>
                            </div>
                            <div className="premium-panel p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Total Supply</p>
                                <p className="text-xl font-semibold text-white">1B BOLT</p>
                            </div>
                            <div className="premium-panel p-4 rounded-xl">
                                <p className="text-sm text-gray-500">Current Price</p>
                                <p className="text-xl font-semibold text-white">1 BOLT/POL</p>
                            </div>
                        </div>
                        <div className="w-full md:max-w-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link to="/dashboard">
                            <button className="cyber-button !py-4 w-full bg-opacity-95 font-medium
                                   transition-all duration-300 flex justify-center items-center gap-2 backdrop-blur-lg">
                                <Rocket size={20}/>
                                Launch App
                            </button>
                            </Link>
                            <button className="cyber-button !py-4 w-full bg-opacity-95 bg-gray-800 hover:bg-gray-700 bg-opacity-90 backdrop-blur-lg text-white font-medium
                                   transition-all duration-300 flex justify-center items-center gap-2">
                                <File size={20}/>
                                Whitepaper
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div
                            className="premium-panel p-6 rounded-xl border border-gray-800">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Contract Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Contract Address (ETH)</p>
                                    <p className="text-gray-300 font-mono text-sm">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
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