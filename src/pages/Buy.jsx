import React, { useState } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react'; 
import { TextInput, Label } from 'flowbite-react';
import Header from "../components/Header.jsx";
import GoBack from "../components/GoBack.jsx";
import AppFooter from "../components/AppFooter.jsx";

const Buy = () => {
    const [amount, setAmount] = useState('');

    // Mock exchange rate - replace with actual rate from API
    const exchangeRate = 1.5; // 1 MATIC = 1.5 USD
    const estimatedCost = parseFloat(amount) * exchangeRate || 0;

    const handleBuy = (e) => {
        e.preventDefault();
        // Implement web3 purchase logic
        console.log('Buy POL tokens:', amount);
    };

    return (
        <>
        <section className="w-full max-w-screen-lg mx-auto my-10">
            <Header />

            <div className="flex items-center justify-start gap-4 mb-8">

                <GoBack url="/account"/>
                <h1 className="text-3xl font-bold neon-text">Buy Crypto</h1>

            </div>

            <div className="premium-panel p-8 rounded-xl">

                <div className="premium-panel p-6 rounded-lg mb-8 bg-cyan-500/5">
                    <h2 className="text-lg font-medium mb-4">Why Buy POL?</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                            <p className="text-gray-300">Exchange POL for BOLT tokens to participate in treasure chests</p>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                            <p className="text-gray-300">Fast and secure transactions on the Polygon network</p>
                        </li>
                        <li className="flex items-start space-x-3">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2" />
                            <p className="text-gray-300">Low transaction fees and instant confirmations</p>
                        </li>
                    </ul>
                </div>

                <form onSubmit={handleBuy} className="space-y-6">
                    <div>
                        <Label htmlFor="amount" value="Amount (POL)" className="text-gray-300 mb-2" />
                        <TextInput
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        {amount && (
                            <p className="mt-2 text-sm text-gray-400">
                                Estimated cost: ${estimatedCost.toFixed(2)} USD
                            </p>
                        )}
                    </div>

                    <div className="premium-panel p-4 rounded-lg bg-cyan-500/5">
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
                            <div className="space-y-2">
                                <p className="text-sm text-gray-300">
                                    You'll need to confirm this transaction in your Web3 wallet.
                                </p>
                                <p className="text-sm text-gray-400">
                                    Make sure you have enough funds to cover the transaction fees.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="cyber-button w-full">
                        Connect Wallet & Buy
                    </button>

                    <a
                        href="https://polygon.technology/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 text-sm text-gray-400 hover:text-gray-300"
                    >
                        <span>Learn more about Polygon Network</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </form>
            </div>
        </section>
        <AppFooter />
        </>
    );
};

export default Buy;