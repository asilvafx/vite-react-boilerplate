import React from 'react';
import { DollarSign, AlertTriangle, ExternalLink, ArrowRight, HelpCircle, ArrowRightLeft, CreditCard, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import { useUser  } from '../context/UserProvider';
import { loadConfig } from '../lib/site';

// Crypto exchanges data
const exchanges = [
    {
        id: 'binance',
        name: 'Binance',
        logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
        url: 'https://www.binance.com',
        features: ['Low fees', 'High liquidity', 'Wide selection of cryptocurrencies'],
        color: 'from-yellow-500/20 to-yellow-600/10'
    },
    {
        id: 'bybit',
        name: 'ByBit',
        logo: 'https://cryptologos.cc/logos/bybit-logo.png',
        url: 'https://www.bybit.com',
        features: ['User -friendly interface', 'Fast transactions', 'Competitive rates'],
        color: 'from-blue-500/20 to-indigo-500/10'
    },
    {
        id: 'coinbase',
        name: 'Coinbase',
        logo: 'https://cryptologos.cc/logos/coinbase-coin-logo.png',
        url: 'https://www.coinbase.com',
        features: ['Beginner friendly', 'Secure platform', 'Easy bank transfers'],
        color: 'from-cyan-500/20 to-blue-500/10'
    }
];

const Buy = () => {

    const { userData } = useUser();

    // Mock wallet data - replace with actual web3 integration
    const walletData = {
        address: '0x1234...5678',
        fullAddress: '0x1234567890abcdef1234567890abcdef12345678',
        balances: {
            POL: 100.50,
            BOLT: 500.25
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletData.fullAddress);
    };

    return (
        <>
            <section className="w-full max-w-screen-lg mx-auto mb-10">

                <AppHeader backUrl="/dashboard"/>
                <SectionTitle title={`Buy Crypto`}/>

                {/* How to Buy BOLT Tokens Section */}
                <div className="premium-panel p-4 md:p-8 rounded-xl mb-8 relative overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"/>
                    <div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"/>

                    <div className="w-full">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg">
                                <DollarSign className="w-8 h-8 text-purple-400"/>
                            </div>
                            <div>
                                <h2 className="text-2xl font-medium neon-text">How to Buy BOLT Tokens</h2>
                                <p className="text-gray-400">Follow these steps to purchase and exchange tokens</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <div className="w-full space-y-6">
                                <div className="premium-panel p-4 md:p-6 rounded-xl">
                                    <div className="space-y-6">
                                        <div className="flex items-start space-x-4">
                                            <div
                                                className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-400 font-medium">1</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-gray-200 font-medium">Purchase POL tokens from an
                                                    exchange</p>
                                                <p className="text-sm text-gray-400">
                                                    Buy POL (Polygon) tokens from exchanges like Binance, Coinbase, or
                                                    ByBit.
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <a href="https://www.binance.com" target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 hover:bg-gray-700 transition-colors">
                                                        Binance <ExternalLink className="w-3 h-3 ml-1"/>
                                                    </a>
                                                    <a href="https://www.bybit.com" target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 hover:bg-gray-700 transition-colors">
                                                        ByBit <ExternalLink className="w-3 h-3 ml-1"/>
                                                    </a>
                                                    <a href="https://www.coinbase.com" target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 hover:bg-gray-700 transition-colors">
                                                        Coinbase <ExternalLink className="w-3 h-3 ml-1"/>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div
                                                className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-blue-400 font-medium">2</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-gray-200 font-medium">Transfer POL to your wallet</p>
                                                <p className="text-sm text-gray-400">
                                                    Send the POL tokens to your CyberChest wallet address on the Polygon
                                                    network.
                                                </p>
                                                <div className="premium-panel p-3 rounded-lg mt-2 bg-gray-800/50">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-mono text-gray-300">{walletData.fullAddress}</p>
                                                        <button
                                                            onClick={copyToClipboard}
                                                            className="text-cyan-400 hover:text-cyan-300 p-1 transition-colors"
                                                        >
                                                            <ExternalLink className="w-4 h-4"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-4">
                                            <div
                                                className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                                <span className="text-cyan-400 font-medium">3</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-gray-200 font-medium">Exchange POL for BOLT
                                                    tokens</p>
                                                <p className="text-sm text-gray-400">
                                                    Once your POL tokens arrive, use our exchange feature to convert
                                                    them to BOLT tokens.
                                                </p>
                                                <Link to="/exchange"
                                                      className="cyber-button mt-2 inline-flex items-center text-sm">
                                                    Go to Exchange
                                                    <ArrowRight className="w-4 h-4 ml-2"/>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="premium-panel p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                                    <div className="flex items-start space-x-3">
                                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5"/>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-300">
                                                Important: Only send POL tokens on the Polygon network to this address.
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Sending tokens from other networks may result in permanent loss of
                                                funds.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="space-y-6 mb-6">
                    <div className="premium-panel p-4 md:p-6 rounded-xl">
                        <h3 className="text-lg font-medium mb-4">Current Exchange Rates</h3>
                        <div className="space-y-4">
                            <div
                                className="premium-panel p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/5">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                            <span className="text-purple-400 font-medium">POL</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-300">Polygon</p>
                                            <p className="text-sm text-gray-400">Network Token</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-medium text-gray-200">1 POL</p>
                                        <p className="text-sm text-gray-400">≈ $1.50 USD</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="premium-panel p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/5">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                            <span className="text-cyan-400 font-medium">BOLT</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-300">BOLT Token</p>
                                            <p className="text-sm text-gray-400">Platform Token</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-medium text-gray-200">1 BOLT</p>
                                        <p className="text-sm text-gray-400">≈ $0.15 USD</p>
                                    </div>
                                </div>
                            </div>

                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-2">Exchange Rate</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-medium neon-text">1 POL = 10 BOLT</p>
                                    <ArrowRightLeft className="w-5 h-5 text-cyan-400"/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">

                            <Link to="/exchange" className="cyber-button flex items-center space-x-2">
                                <ArrowRightLeft className="w-4 h-4"/>
                                <span>Exchange Tokens</span>
                            </Link>
                        </div>
                    </div>

                    <div className="premium-panel p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <HelpCircle className="w-5 h-5 text-cyan-400 mt-0.5"/>
                            <div>
                                <p className="text-sm text-gray-300 font-medium">Need Help?</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    If you're having trouble purchasing or exchanging tokens, check our
                                    <a href="#" className="text-cyan-400 hover:text-cyan-300 ml-1">FAQ</a> or
                                    <a href="#" className="text-cyan-400 hover:text-cyan-300 ml-1">contact support</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Crypto Exchanges Section */}
                <div className="premium-panel p-8 rounded-xl mb-8 relative overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"/>
                    <div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"/>

                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                                <DollarSign className="w-8 h-8 text-blue-400"/>
                            </div>
                            <div>
                                <h2 className="text-2xl font-medium neon-text">Recommended Exchanges</h2>
                                <p className="text-gray-400">Trusted platforms to purchase POL tokens</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {exchanges.map(exchange => (
                                <div key={exchange.id}
                                     className="premium-panel p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/80 hover:scale-[1.02] transition-all duration-300 group">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div
                                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${exchange.color} flex items-center justify-center p-2`}>
                                            <img
                                                src={exchange.logo}
                                                alt={exchange.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <h3 className="text-xl font-medium group-hover:text-cyan-400 transition-colors">{exchange.name}</h3>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {exchange.features.map((feature, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <div
                                                    className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-cyan-400"/>
                                                </div>
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={exchange.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cyber-button w-full flex items-center justify-center space-x-2"
                                    >
                                        <span>Visit {exchange.name}</span>
                                        <ExternalLink className="w-4 h-4"/>
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 premium-panel p-4 rounded-lg bg-cyan-500/5">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="w-5 h-5 text-cyan-400 mt-0.5"/>
                                <div>
                                    <p className="text-sm text-gray-300 font-medium">Security Notice</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Always verify you're on the official exchange website before making any
                                        transactions.
                                        Enable two-factor authentication (2FA) for additional security.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AppFooter/>
        </>
    );
};

export default Buy;