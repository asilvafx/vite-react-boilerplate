import React, { useState } from 'react';
import { Wallet, ArrowRightLeft, Coins } from 'lucide-react';
import { TextInput, Label, Select } from 'flowbite-react';
import Header from "../components/Header.jsx";
import GoBack from "../components/GoBack.jsx";
import AppFooter from "../components/AppFooter.jsx";

const Exchange = () => {
    const [exchangeData, setExchangeData] = useState({
        fromToken: 'POL',
        toToken: 'BOLT',
        amount: '',
    });

    const tokens = {
        POL: { balance: '1000', price: '1.00' },
        BOLT: { balance: '500', price: '2.50' }
    };

    const handleExchange = (e) => {
        e.preventDefault();
        console.log('Exchange:', exchangeData);
    };

    const calculateEstimate = () => {
        const amount = parseFloat(exchangeData.amount) || 0;
        const fromPrice = parseFloat(tokens[exchangeData.fromToken].price);
        const toPrice = parseFloat(tokens[exchangeData.toToken].price);
        return ((amount * fromPrice) / toPrice).toFixed(2);
    };

    return (
        <>
        <section className="w-full max-w-screen-lg mx-auto my-10">
            <Header />

            <div className="flex items-center justify-start gap-4 mb-8">

                <GoBack url="/dashboard"/>
                <h1 className="text-3xl font-bold neon-text">Token Exchange</h1>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Exchange Form */}
                <div className="premium-panel p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-6">
                        <ArrowRightLeft className="w-6 h-6 premium-icon" />
                        <h2 className="text-xl font-medium">Exchange Tokens</h2>
                    </div>

                    <form onSubmit={handleExchange} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="fromToken" value="From" className="text-gray-300 mb-2" />
                                <Select
                                    id="fromToken"
                                    value={exchangeData.fromToken}
                                    onChange={(e) => setExchangeData({ ...exchangeData, fromToken: e.target.value })}
                                    required
                                >
                                    <option value="POL">POL</option>
                                    <option value="BOLT">BOLT</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="toToken" value="To" className="text-gray-300 mb-2" />
                                <Select
                                    id="toToken"
                                    value={exchangeData.toToken}
                                    onChange={(e) => setExchangeData({ ...exchangeData, toToken: e.target.value })}
                                    required
                                >
                                    <option value="BOLT">BOLT</option>
                                    <option value="POL">POL</option>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="amount" value="Amount" className="text-gray-300 mb-2" />
                            <TextInput
                                id="amount"
                                type="number"
                                icon={Coins}
                                placeholder="0.00"
                                value={exchangeData.amount}
                                onChange={(e) => setExchangeData({ ...exchangeData, amount: e.target.value })}
                                required
                            />
                        </div>

                        {exchangeData.amount && (
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <p className="text-gray-400 mb-2">Estimated {exchangeData.toToken} to receive:</p>
                                <p className="text-2xl font-medium neon-text">{calculateEstimate()} {exchangeData.toToken}</p>
                            </div>
                        )}

                        <button type="submit" className="cyber-button w-full">
                            Exchange Tokens
                        </button>
                    </form>
                </div>

                {/* Token Balances */}
                <div className="premium-panel p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-6">
                        <Wallet className="w-6 h-6 premium-icon" />
                        <h2 className="text-xl font-medium">Your Balances</h2>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(tokens).map(([token, data]) => (
                            <div key={token} className="p-4 bg-gray-800 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 mb-1">{token} Balance</p>
                                        <p className="text-2xl font-medium neon-text">{data.balance} {token}</p>
                                    </div>
                                    <div className="text-right">
                                    <p className="text-gray-400 mb-1">Price</p>
                                    <p className="text-lg font-medium text-cyan-400">${data.price}</p>
                                    </div>
                            </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
        <AppFooter />
        </>
    );
};

export default Exchange;