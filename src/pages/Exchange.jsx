import React, { useState } from 'react';
import { Wallet, ArrowRightLeft, Coins, Loader2, Check, X, ArrowRight } from 'lucide-react';
import { TextInput, Label, Select } from 'flowbite-react';
import Header from "../components/Header";
import GoBack from "../components/GoBack";
import AppFooter from "../components/AppFooter";
import { useUser } from '../context/UserProvider';
import { Link } from 'react-router-dom';
import {decryptHash} from "../lib/crypto.js";
import { sendTransaction } from '../lib/web3';
import {toast} from 'react-hot-toast';

const PaymentStatus = {
    NONE: 'none',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed'
};

const Exchange = () => {
    const { userData } = useUser();

    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.NONE);

    const [exchangeData, setExchangeData] = useState({
        fromToken: 'POL',
        toToken: 'BOLT',
        amount: '',
    });

    const tokens = {
        POL: { balance: parseFloat(userData?.web3_network_token_balance).toFixed(3), price: '1.00' },
        BOLT: { balance: parseFloat(userData?.web3_custom_token_balance).toFixed(3), price: '0.10' }
    };

    const handleExchange = async (e) => {
        e.preventDefault();

        // Validate the amount
        const amountToExchange = parseFloat(exchangeData.amount);
        if (isNaN(amountToExchange) || amountToExchange <= 0) {
            toast.error('Please enter a valid amount to exchange.');
            return;
        }

        // Check if the user has enough tokens
        const fromTokenBalance = tokens[exchangeData.fromToken].balance;
        if (amountToExchange > fromTokenBalance) {
            toast.error(`Insufficient ${exchangeData.fromToken} balance.`);
            return;
        }

        setPaymentStatus(PaymentStatus.PROCESSING);

        try {
            const tokenHolder = userData?.web3_address; // User's wallet address
            const holderSecretKey = decryptHash(userData?.web3_pk); // Decrypted private key
            const chainToken = process.env.WEB3_CHAIN_SYMBOL;
            const contractToken = process.env.WEB3_CONTRACT_SYMBOL;

            return false;
            // Step 1: Send tokens from user wallet to master wallet
            const sendTx = await sendTransaction(
                amountToExchange,
                process.env.WEB3_MASTER_ADRESS,
                tokenHolder,
                holderSecretKey
            );

            // Check if the transaction was successful
            if (sendTx && sendTx.txhash) {
                // Step 2: Simulate receiving tokens back to the user's wallet
                const amountToReceive = calculateEstimate(); // Calculate the amount to receive based on the exchange rate

                const sendFinalTx = await sendTransaction(
                    amountToReceive,
                    tokenHolder,
                    process.env.WEB3_MASTER_ADRESS,
                    process.env.WEB3_MASTER_PK
                );

                if (sendFinalTx && sendFinalTx.txhash) {
                    setPaymentStatus(PaymentStatus.SUCCESS);
                    setExchangeData({ ...exchangeData, amount: '' });
                    toast.success(`Successfully exchanged ${amountToExchange} ${exchangeData.fromToken} for ${amountToReceive} ${exchangeData.toToken}.`);
                } else {
                    setPaymentStatus(PaymentStatus.ERROR);
                    toast.error(`Conversion failed. Please, try again later.`);
                }
                // For demonstration, we will just simulate a successful exchange

            } else {
                throw new Error('Transaction failed');
            }
        } catch (error) {
            console.error("Exchange error:", error);
            setPaymentStatus(PaymentStatus.FAILED);
            toast.error('Exchange failed. Please try again.');
        }
    };

    const handleRetry = () => {
        setPaymentStatus(PaymentStatus.NONE);
    };

    const calculateEstimate = () => {
        const amount = parseFloat(exchangeData.amount) || 0;
        const fromPrice = parseFloat(tokens[exchangeData.fromToken].price);
        const toPrice = parseFloat(tokens[exchangeData.toToken].price);
        return ((amount * fromPrice) / toPrice).toFixed(3);
    };

    const renderPaymentStatus = () => {
        switch (paymentStatus) {
            case PaymentStatus.PROCESSING:
                return (
                    <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                                </div>
                                <h3 className="text-xl font-medium mb-2">Processing Exchange</h3>
                                <p className="text-gray-400">Please wait while we process your transaction...</p>
                            </div>
                        </div>
                    </div>
                );

            case PaymentStatus.SUCCESS:
                return (
                    <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Check className="w-8 h-8 text-green-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Exchange Successful!</h3>
                                <p className="text-gray-400 mb-6">
                                    Successfully exchanged {exchangeData.amount} {exchangeData.fromToken} for {calculateEstimate()} {exchangeData.toToken}
                                </p>
                                <Link to="/dashboard" className="cyber-button w-full flex items-center justify-center">
                                    <ArrowRight className="w-5 h-5 mr-2" />
                                    Go to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                );

            case PaymentStatus.FAILED:
                return (
                    <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <X className="w-8 h-8 text-red-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Exchange Failed</h3>
                                <p className="text-gray-400 mb-6">We couldn't process your exchange. Please try again.</p>
                                <button
                                    onClick={handleRetry}
                                    className="cyber-button w-full"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
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

                            <div className="p-4 bg-gray-800 rounded-lg">
                                <p className="text-gray-400 mb-2">Estimated {exchangeData.toToken} to receive:</p>
                                <p className="text-2xl font-medium neon-text">
                                    {exchangeData.amount ? calculateEstimate() : '0.000'} {exchangeData.toToken}
                                </p>
                            </div>

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

            {renderPaymentStatus()}
        </>
    );
};

export default Exchange;