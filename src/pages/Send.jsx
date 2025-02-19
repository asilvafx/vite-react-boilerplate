import React, { useState } from 'react';
import { Send as SendIcon, AlertCircle, Loader2, Check, X, ArrowRight } from 'lucide-react';
import { TextInput, Label, Select } from 'flowbite-react';
import toast from 'react-hot-toast';
import GoBack from "../components/GoBack";
import Header from "../components/Header";
import AppFooter from "../components/AppFooter";
import TokenBalanceSection from '../components/TokenBalanceSection';
import { Link } from 'react-router-dom';
import { sendTransaction } from '../lib/web3';
import { useUser } from '../context/UserProvider';
import {decryptHash} from '../lib/crypto';

const PaymentStatus = {
    NONE: 'none',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed'
};

const Send = () => {
    const { userData } = useUser();

    const [formData, setFormData] = useState({
        token: 'POL',
        amount: '',
        address: ''
    });

    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.NONE);

    // Mock wallet data - replace with actual web3 integration
    const walletData = {
        balances: {
            POL: 100.50,
            BOLT: 500.25
        }
    };

    // Get current balance based on selected token
    const currentBalance = walletData.balances[formData.token];

    const validateForm = () => {
        const amount = parseFloat(formData.amount);
        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount');
            return false;
        }

        if (amount > currentBalance) {
            toast.error(`Insufficient ${formData.token} balance`);
            return false;
        }

        if (!formData.address.startsWith('0x') || formData.address.length !== 42) {
            toast.error('Please enter a valid wallet address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setPaymentStatus(PaymentStatus.PROCESSING);

        try {
            // Call sendTransaction with the required parameters
            const tokenHolder = userData?.web3_address;
            const holderSecretKey = decryptHash(userData?.web3_pk);

            const sendTx = await sendTransaction(formData.amount, formData.address, tokenHolder, holderSecretKey);

            if (sendTx && sendTx.txhash && sendTx.block) {
                setPaymentStatus(PaymentStatus.SUCCESS);
                setFormData({ ...formData, amount: '', address: '' });
                toast.success(`Transaction successful! TX Hash: ${sendTx.txhash}, Block: ${sendTx.block}`);
            } else {
                throw new Error('Transaction failed');
            }
        } catch (error) {
            console.error("Transaction error:", error);
            setPaymentStatus(PaymentStatus.FAILED);
            toast.error('Transaction failed. Please try again.');
        }
    };

    const handleRetry = () => {
        setPaymentStatus(PaymentStatus.NONE);
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
                                <h3 className="text-xl font-medium mb-2">Processing Transfer</h3>
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
                                <h3 className="text-xl font-medium mb-2">Transfer Successful!</h3>
                                <p className="text-gray-400 mb-6">
                                    Successfully sent {formData.amount} {formData.token} to {formData.address.slice(0, 6)}...{formData.address.slice(-4)}
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
                                <h3 className="text-xl font-medium mb-2">Transfer Failed</h3>
                                <p className="text-gray-400 mb-4">We couldn't process your transfer. Please try again.</p>
                                <div className="premium-panel p-4 rounded-lg mb-6 bg-red-500/5 border-red-500/10">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                                        <p className="text-sm text-gray-400">
                                            Error: Insufficient funds or network issue. Please ensure you have enough tokens and your wallet is connected properly.
                                        </p>
                                    </div>
                                </div>
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
                    <h1 className="text-3xl font-bold neon-text">Send Crypto</h1>
                </div>

                <div className="premium-panel p-8 rounded-xl">
                    {/* Token Balances */}
                    <TokenBalanceSection walletData={walletData} />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="token" value="Select Token" className="text-gray-300 mb-2"/>
                            <Select
                                id="token"
                                value={formData.token}
                                onChange={(e) => setFormData({...formData, token: e.target.value})}
                                required
                                className="bg-gray-800"
                            >
                                <option value="POL">POL Token</option>
                                <option value="BOLT">BOLT Token</option>
                            </Select>
                            <p className="mt-2 text-sm text-gray-400">
                                Selected token balance: {currentBalance} {formData.token}
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="amount" value="Amount" className="text-gray-300 mb-2"/>
                            <TextInput
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="address" value="Recipient Address" className="text-gray-300 mb-2"/>
                            <TextInput
                                id="address"
                                type="text"
                                placeholder="0x..."
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="premium-panel p-4 rounded-lg bg-cyan-500/5">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5"/>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-300">
                                            Please verify the recipient's address carefully. Token transfers cannot be
                                            reversed.
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Only send {formData.token} tokens to a compatible wallet address on the Polygon
                                            network.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {formData.token === 'BOLT' && (
                                <div className="premium-panel p-4 rounded-lg bg-purple-500/5">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5"/>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-300">
                                                BOLT tokens can only be sent to addresses that support the BOLT token
                                                contract.
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Make sure the recipient's wallet is compatible with BOLT tokens.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="cyber-button w-full flex items-center justify-center space-x-2"
                        >
                            <SendIcon className="w-5 h-5"/>
                            <span>Send Tokens</span>
                        </button>
                    </form>
                </div>
            </section>
            <AppFooter />

            {renderPaymentStatus()}
        </>
    );
};

export default Send;