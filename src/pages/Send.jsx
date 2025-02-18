import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send as SendIcon, AlertCircle, Wallet, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextInput, Label, Select } from 'flowbite-react';
import toast from 'react-hot-toast';

const Send = () => {
    const [formData, setFormData] = useState({
        token: 'POL',
        amount: '',
        address: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);

    // Mock wallet data - replace with actual web3 integration
    const walletData = {
        balances: {
            POL: 100.50,
            BOLT: 500.25
        }
    };

    // Get current balance based on selected token
    const currentBalance = walletData.balances[formData.token as keyof typeof walletData.balances];

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsProcessing(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast.success(`${formData.amount} ${formData.token} sent successfully!`);
            setFormData({ ...formData, amount: '', address: '' });
        } catch (error) {
            toast.error('Transaction failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 mt-20">
            <Link to="/account" className="inline-flex items-center cyber-button mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Account
            </Link>

            <div className="premium-panel p-8 rounded-xl">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <SendIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h1 className="text-2xl font-medium">Send Tokens</h1>
                </div>

                {/* Token Balances */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="premium-panel p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Wallet className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">POL Balance</p>
                                <p className="text-xl font-medium neon-text">
                                    {walletData.balances.POL} POL
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="premium-panel p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Wallet className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">BOLT Balance</p>
                                <p className="text-xl font-medium neon-text">
                                    {walletData.balances.BOLT} BOLT
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="token" value="Select Token" className="text-gray-300 mb-2" />
                        <Select
                            id="token"
                            value={formData.token}
                            onChange={(e) => setFormData({ ...formData, token: e.target.value })}
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
                        <Label htmlFor="amount" value="Amount" className="text-gray-300 mb-2" />
                        <TextInput
                            id="amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="address" value="Recipient Address" className="text-gray-300 mb-2" />
                        <TextInput
                            id="address"
                            type="text"
                            placeholder="0x..."
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="premium-panel p-4 rounded-lg bg-cyan-500/5">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-300">
                                        Please verify the recipient's address carefully. Token transfers cannot be reversed.
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Only send {formData.token} tokens to a compatible wallet address on the Polygon network.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {formData.token === 'BOLT' && (
                            <div className="premium-panel p-4 rounded-lg bg-purple-500/5">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5" />
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-300">
                                            BOLT tokens can only be sent to addresses that support the BOLT token contract.
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
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <SendIcon className="w-5 h-5" />
                                <span>Send Tokens</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Send;