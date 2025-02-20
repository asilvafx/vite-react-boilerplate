import React, { useState } from 'react';
import { Wallet, ArrowRightLeft, Coins, Loader2, Check, X, ArrowRight } from 'lucide-react';
import { TextInput, Label, Select } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser  } from '../context/UserProvider';
import Header from "../components/Header";
import GoBack from "../components/GoBack";
import AppFooter from "../components/AppFooter";
import { decryptHash } from "../lib/crypto.js";
import { sendTransaction } from '../lib/web3';
import { loadConfig } from '../lib/site';

const PaymentStatus = {
    NONE: 'none',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed'
};

const Exchange = () => {
    const { userData } = useUser ();
    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.NONE);
    const [exchangeData, setExchangeData] = useState({
        fromToken: loadConfig.WEB3_CONTRACT_SYMBOL,
        toToken: loadConfig.WEB3_CHAIN_SYMBOL,
        amount: '',
    });

    // Access the chain and contract token symbols
    const chainToken = loadConfig.WEB3_CHAIN_SYMBOL;
    const contractToken = loadConfig.WEB3_CONTRACT_SYMBOL;

    const userBalance = {
        chain: parseFloat(userData?.web3_network_token_balance),
        contract: parseFloat(userData?.web3_custom_token_balance)
    };

    // Construct the tokens object
    const tokens = {
        [chainToken]: {
            balance: userBalance.chain.toFixed(3),
            price: '1.00'
        },
        [contractToken]: {
            balance: userBalance.contract.toFixed(3),
            price: loadConfig.WEB3_CONTRACT_BASE_PRICE
        }
    };

    const handleExchange = async (e) => {
        e.preventDefault();

        // Check if tokens match
        if (exchangeData.toToken === exchangeData.fromToken) {
            toast.error(`Invalid swap method.`);
            return;
        }

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
            const chainToken = loadConfig.WEB3_CHAIN_SYMBOL;

            // Step 1: Send tokens from user wallet to master wallet
            const sendTx = await sendTransaction(
                amountToExchange,
                process.env.WEB3_MASTER_ADDRESS,
                tokenHolder,
                holderSecretKey,
                exchangeData.fromToken === chainToken
            );

            // Check if the transaction was successful
            if (sendTx && sendTx.txhash) {
                // Step 2: Simulate receiving tokens back to the user's wallet
                const amountToReceive = calculateEstimate(); // Calculate the amount to receive based on the exchange rate

                const sendFinalTx = await sendTransaction(
                    amountToReceive,
                    tokenHolder,
                    process.env.WEB3_MASTER_ADDRESS,
                    process.env.WEB3_MASTER_PK,
                    exchangeData.toToken === chainToken
                );

                if (sendFinalTx && sendFinalTx.txhash) {
                    setPaymentStatus(PaymentStatus.SUCCESS);
                    setExchangeData({ ...exchangeData, amount: '' });
                    toast.success(`Successfully exchanged ${amountToExchange} ${exchangeData.fromToken} for ${amountToReceive} ${exchangeData.toToken}.`);
                } else {
                    setPaymentStatus(PaymentStatus.FAILED);
                    toast.error(`Conversion failed. Please, try again later.`);
                }
            } else {
                throw new Error('Transaction failed ');
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
                                    <select
                                        id="fromToken"
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        value={exchangeData.fromToken}
                                        onChange={(e) => setExchangeData({ ...exchangeData, fromToken: e.target.value })}
                                        required
                                    >
                                        <option value={chainToken}>{chainToken}</option>
                                        <option value={contractToken}>{contractToken}</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="toToken" value="To" className="text-gray-300 mb-2" />
                                    <select
                                        id="toToken"
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        value={exchangeData.toToken}
                                        onChange={(e) => setExchangeData({ ...exchangeData, toToken: e.target.value })}
                                        required
                                    >
                                        <option value={contractToken}>{contractToken}</option>
                                        <option value={chainToken}>{chainToken}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="amount" value="Amount" className="text-gray-300 mb-2" />
                                <input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                        value={exchangeData.amount}
                        onChange={(e) => setExchangeData({ ...exchangeData, amount: e.target.value })}
                        required
                        className="text-3xl bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg text-center" // Large font size for input
                        />
                </div>

                <div className="p-4 premium-card rounded-lg">
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
                    <div key={token} className="p-4 premium-bg premium-border rounded-lg">
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