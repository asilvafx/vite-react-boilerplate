import React, { useState } from 'react';
import { Send as SendIcon, AlertCircle, Wallet, Loader2 } from 'lucide-react';
import { TextInput, Label, Select } from 'flowbite-react';
import toast from 'react-hot-toast';
import GoBack from "../components/GoBack";
import Header from "../components/Header";
import AppFooter from "../components/AppFooter";
import TokenBalanceSection from '../components/TokenBalanceSection';

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
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin"/>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <SendIcon className="w-5 h-5"/>
                                <span>Send Tokens</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
        <AppFooter />
        </>
    );
};

export default Send;