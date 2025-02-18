import React, { useState } from 'react';
import { ArrowLeft, Shield, Zap, Rocket, Check, Wallet, X, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import GoBack from '../components/GoBack';

const chestPlans = [
    {
        id: 'mini',
        name: 'Mini Chest',
        deposit: 50,
        maxTickets: 100,
        color: 'from-emerald-500/20 to-teal-500/10',
        icon: Shield,
        description: 'Perfect for beginners. Lower risk, quicker rounds.',
        features: ['Max 100 tickets', 'Up to 5,000 TOKEN jackpot', '5% platform fee']
    },
    {
        id: 'standard',
        name: 'Standard Chest',
        deposit: 100,
        maxTickets: 200,
        color: 'from-blue-500/20 to-cyan-500/10',
        icon: Zap,
        description: 'Most popular choice. Balanced risk and reward.',
        features: ['Max 200 tickets', 'Up to 20,000 TOKEN jackpot', '4% platform fee']
    },
    {
        id: 'premium',
        name: 'Premium Chest',
        deposit: 500,
        maxTickets: 1000,
        color: 'from-purple-500/20 to-pink-500/10',
        icon: Rocket,
        description: 'For high rollers. Maximum potential returns.',
        features: ['Max 1000 tickets', 'Unlimited jackpot', '3% platform fee']
    }
];

const PaymentStatus = {
    NONE: 'none',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed'
};

const Create = () => {
    const [selectedPlan, setSelectedPlan] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.NONE);

    const handleConfirm = () => {
        setPaymentStatus(PaymentStatus.PROCESSING);

        // Simulate payment process
        setTimeout(() => {
            // Randomly succeed or fail for demonstration
            setPaymentStatus(Math.random() > 0.5 ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
        }, 2000);
    };

    const handleRetry = () => {
        setPaymentStatus(PaymentStatus.NONE);
    };

    const selectedChestPlan = chestPlans.find(plan => plan.id === selectedPlan);

    const renderPaymentStatus = () => {
        switch (paymentStatus) {
            case PaymentStatus.PROCESSING:
                return (
                    <div className="fixed inset-0 bg-neutral-800/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                                </div>
                                <h3 className="text-xl font-medium mb-2">Processing Payment</h3>
                                <p className="text-gray-400">Please wait while we process your transaction...</p>
                            </div>
                        </div>
                    </div>
                );

            case PaymentStatus.SUCCESS:
                return (
                    <div className="fixed inset-0 bg-neutral-800/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Check className="w-8 h-8 text-green-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Payment Successful!</h3>
                                <p className="text-gray-400 mb-6">Your chest has been created successfully.</p>
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
                    <div className="fixed inset-0 bg-neutral-800/60 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <X className="w-8 h-8 text-red-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Payment Failed</h3>
                                <p className="text-gray-400 mb-4">We couldn't process your payment. Please try again.</p>
                                <div className="premium-panel p-4 rounded-lg mb-6 bg-red-500/5 border-red-500/10">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                                        <p className="text-sm text-gray-400">
                                            Error: Insufficient funds or network issue. Please ensure you have enough tokens and your wallet is connected properly.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleRetry}
                                        className="cyber-button w-full"
                                    >
                                        Try Again
                                    </button>
                                </div>
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
        <Header />
        <section className="w-full max-w-screen-lg mx-auto my-10">

            {showConfirmation && selectedChestPlan ? (
                    <>
                    <div className="flex items-center justify-start gap-4 mb-8">

                        <GoBack url="/create" onClick={() => setShowConfirmation(false)} />
                        <h1 className="text-2xl font-bold neon-text">Confirm Chest Creation</h1>
                    </div>
                    <div className="premium-panel p-8 rounded-xl">

                            <div className="space-y-6">
                                <div className="premium-panel p-6 rounded-lg">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div
                                            className={`rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br ${selectedChestPlan.color}`}>
                                            <selectedChestPlan.icon className="w-6 h-6 text-white"/>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-gray-200">{selectedChestPlan.name}</h3>
                                            <p className="text-gray-400">{selectedChestPlan.description}</p>
                                        </div>
                                    </div>

                                    <div className="premium-divider my-4"/>

                                    <div className="space-y-3">
                                        {selectedChestPlan.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-300">
                                                <Check className="w-4 h-4 mr-2 text-cyan-400"/>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="premium-panel p-6 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-400">Deposit Amount</span>
                                        <span
                                            className="text-xl font-medium neon-text">{selectedChestPlan.deposit} TOKENS</span>
                                    </div>
                                    <button
                                        onClick={handleConfirm}
                                        className="cyber-button w-full flex items-center justify-center"
                                        disabled={paymentStatus === PaymentStatus.PROCESSING}
                                    >
                                        <Wallet className="w-5 h-5 mr-2"/>
                                        Proceed with Payment
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    * Legal disclaimer
                                </button>
                            </div>
                        </div>
                    </>
                        ) : (
                <>
                <div className="flex items-center justify-start gap-4 mb-8">

                    <GoBack url="/dashboard"/>
                    <h1 className="text-3xl font-bold neon-text">Create a New Chest</h1>

                </div>
                    <div className="premium-panel p-8 rounded-xl">
                        <h2 className="text-2xl font-bold neon-text mb-8">Choose One</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {chestPlans.map((plan) => {
                                const Icon = plan.icon;
                                const isSelected = selectedPlan === plan.id;

                                return (
                                    <div
                                        key={plan.id}
                                        className={`premium-card cursor-pointer relative ${
                                            isSelected
                                                ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                                                : 'hover:border-cyan-400/30'
                                        }`}
                                        onClick={() => setSelectedPlan(plan.id)}
                                    >
                                        {isSelected && (
                                            <div
                                                className="absolute -top-3 -right-3 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                                Selected
                                            </div>
                                        )}
                                        <div
                                            className={`rounded-full w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br ${plan.color}`}>
                                            <Icon className="w-6 h-6 text-white"/>
                                        </div>
                                        <h3 className="text-xl font-medium mb-2 text-gray-200">{plan.name}</h3>
                                        <p className="text-2xl font-bold mb-4 neon-text">{plan.deposit} TOKENS</p>
                                        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="text-sm text-gray-300 flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"/>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        {selectedPlan && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setShowConfirmation(true)}
                                    className="cyber-button px-8"
                                >
                                    Continue
                                </button>
                            </div>
                        )}
                    </div>

                </>
            )}

            {renderPaymentStatus()}
                    </section>
                <AppFooter/>
                </>
                );
            };

            export default Create;