import React from 'react';
import {File, Shield, Rocket, Copy} from "lucide-react";
import {Link} from 'react-router-dom';
import {loadConfig} from '../lib/site';
import {shortenAddress, formatNumber} from '../lib/utils';
import copyToClipboard from './CopyToClipboard';
import polygon_icon from '../assets/polygon.svg';

const StatsSection  = () => {

    const site = loadConfig;

    return (
        <section className="w-full max-w-screen-lg mx-auto">
            <div className="p-0 grid grid-cols-1 gap-12">
                <div className="space-y-6 pt-10 md:pt-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 md:pt-8">
                        <div className="premium-panel p-4 rounded-xl">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-500">Blockchain</p>
                                    <p className="text-xl font-semibold text-white">{site.WEB3_CHAIN_NAME}</p>
                                </div>
                                <img alt={site.WEB3_CHAIN_NAME} className="h-8 w-auto pointer-events-none filter invert"
                                     src={polygon_icon} width={40} height={40}/>
                            </div>
                        </div>
                        <div className="premium-panel p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Contract</p>
                            <p className="text-xl font-semibold text-white">{site.WEB3_CONTRACT_TYPE}</p>
                        </div>
                        <div className="premium-panel p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Total Supply</p>
                            <p className="text-xl font-semibold text-white">{formatNumber(site.WEB3_CONTRACT_SUPPLY)} {site.WEB3_CONTRACT_SYMBOL}</p>
                        </div>
                        <div className="premium-panel p-4 rounded-xl">
                            <p className="text-sm text-gray-500">Current Price</p>
                            <p className="text-xl font-semibold text-white">{`${parseFloat(site.WEB3_CONTRACT_BASE_PRICE).toFixed(3)} ${site.WEB3_CONTRACT_SYMBOL}/${site.WEB3_CHAIN_SYMBOL}`}</p>
                        </div>
                    </div>
                    <div className="w-full md:max-w-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to="/dashboard">
                        <button className="cyber-button !py-4 w-full bg-opacity-95
                               transition-all duration-300 flex justify-center items-center gap-2 backdrop-blur-lg">
                            <Rocket size={20}/>
                            <span className="neon-text">Launch App</span>
                        </button>
                        </Link>
                        <button className="cyber-button !py-4 w-full bg-opacity-95 bg-gray-800 hover:bg-gray-700 bg-opacity-90 backdrop-blur-lg text-white
                               transition-all duration-300 flex justify-center items-center gap-2">
                            <File size={20}/>
                            <span>Whitepaper</span>
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
                            <div className="mb-6">
                                <p className="text-sm text-gray-500">Contract Address
                                    ({loadConfig.WEB3_CHAIN_SYMBOL})</p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-gray-300 font-mono text-sm text-truncate">{shortenAddress(loadConfig.WEB3_CONTRACT_ADDRESS)}</p>
                                    <button
                                        onClick={() => copyToClipboard(loadConfig.WEB3_CONTRACT_ADDRESS, 'Contract address copied to clipboard')}
                                        className="text-cyan-400 hover:text-cyan-300 p-1 transition-colors"
                                    >
                                        <Copy className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between items-center gap-4">

                                <div className="flex items-center gap-2 text-blue-400">
                                    <Shield size={16}/>
                                    <span className="text-sm">Audited by Certik</span>
                                </div>
                                <div>
                                    <Link
                                        className="premium-gradient-text font-semibold"
                                        target="_blank"
                                        to={`https://polygonscan.com/address/${loadConfig.WEB3_CONTRACT_ADDRESS}`}>
                                        View on Polygonscan
                                    </Link>
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