import React, { useState } from 'react';
import { Check, Wallet, X, AlertCircle, ArrowRight, Loader2, Trophy, Users, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { chestPlans } from '../lib/chests';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import { useUser  } from '../context/UserProvider';
import PrizeDistribution from '../components/PrizeDistribution';
import {getSiteData, loadConfig} from '../lib/site';
import ScrollToTop from '../components/ScrollToTop';


const PaymentStatus = {
    NONE: 'none',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed'
};

const Create = () => {
    const { userData } = useUser ();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.NONE);

    const handleConfirm = () => {
        setPaymentStatus(PaymentStatus.PROCESSING);

        // Simulate payment process
        setTimeout(() => {
            setPaymentStatus(Math.random() > 0.5 ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);
        }, 2000);
    };

    const handleRetry = () => {
        setPaymentStatus(PaymentStatus.NONE);
    };

    const selectedChestPlan = selectedPlan ? chestPlans.find(plan => plan.id === selectedPlan) : null;

    const renderPaymentStatus = () => {
        switch (paymentStatus) {
            case PaymentStatus.PROCESSING:
                return (
                    <div className="fixed inset-0 bg-neutral-900/700 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-6 md:p-8 rounded-xl max-w-md w-full mx-4">
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
                    <div className="fixed inset-0 bg-neutral-900/700 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-6 md:p-8 rounded-xl max-w-md w-full mx-4">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Check className="w-8 h-8 text-green-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-medium mb-2">Chest Created Successfully!</h3>
                                <p className="text-gray-400 mb-6">Your chest has been created and is now open for participants.</p>
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
                    <div className="fixed inset-0 bg-neutral-900/700 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="premium-panel p-6 md:p-8 rounded-xl max-w-md w-full mx-4">
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
                <AppHeader backUrl="/chests" />
                <SectionTitle title={showConfirmation && selectedChestPlan ? 'Confirm Chest Creation' : 'Create New Chest'} />

                {showConfirmation && selectedChestPlan ? (
                    <div>
                        <ScrollToTop />
                        <div className="space-y-6">
                            <div className="premium-panel p-4 md:p-6 rounded-lg">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className={`rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br ${selectedChestPlan.color}`}>
                                        <Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-gray-200">{selectedChestPlan.name}</h3>
                                        <p className="text-gray-400">{selectedChestPlan.description}</p>
                                    </div>
                                </div>

                                <div className="premium-divider my-4" />

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="premium-panel p-3 rounded-lg">
                                        <p className="text-sm text-gray-400 mb-1">Total Tickets</p>
                                        <p className="font-medium flex items-center">
                                            <Timer className="w-4 h-4 mr-2 premium-icon" />
                                            {selectedChestPlan.maxTickets}
                                        </p>
                                    </div>
                                    <div className="premium-panel p-3 rounded-lg">
                                        <p className="text-sm text-gray-400 mb-1">Max Per User</p>
                                        <p className="font-medium flex items-center">
                                            <Users className="w-4 h-4 mr-2 premium-icon" />
                                            {selectedChestPlan.maxTicketsPerUser  }
                                        </p>
                                    </div>
                                </div>

                                <PrizeDistribution planName={selectedChestPlan.name} />
                            </div>

                            <div className="premium-panel p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Total Cost</span>
                                        <span
                                            className="text-xl font-medium neon-text">{selectedChestPlan.price} ${loadConfig.WEB3_CONTRACT_SYMBOL}</span>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        <p>• Each ticket will cost 10 {loadConfig.WEB3_CONTRACT_SYMBOL} for
                                            participants</p>
                                        <p>• Winners will be drawn when all tickets are sold</p>
                                        <p>• 95% of the prize pool goes to the chest creator and winners</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleConfirm}
                                    className="cyber-button w-full mt-6 flex items-center justify-center"
                                    disabled={paymentStatus === PaymentStatus.PROCESSING}
                                >
                                    <Wallet className="w-5 h-5 mr-2" />
                                   PAY & CREATE CHEST
                                </button>
                            </div>

                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="text-gray-400 hover:text-gray-300 text-sm"
                            >
                                ← Go back and select different plan
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {chestPlans.map((plan) => {
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
                                            <div className="absolute top-3 right-3 bg-cyan-900 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                                Selected
                                            </div>
                                        )}
                                        <div className={`rounded-full w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br ${plan.color}`}>
                                            <Trophy className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-medium mb-2 text-gray-200">{plan.name}</h3>
                                        <p className="text-2xl font-bold mb-4 neon-text">{plan.price} {loadConfig.WEB3_CONTRACT_SYMBOL}</p>
                                        <div className="space-y-3 text-sm text-gray-400">
                                            <p>• {plan.maxTickets} total tickets available</p>
                                            <p>• Up to {plan.maxTicketsPerUser  } tickets per user</p>
                                            <p>• {plan.winnerPlaces} winner places</p>
                                            <p>• {plan.ticketPrice} {loadConfig.WEB3_CONTRACT_SYMBOL} per ticket for participants</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {selectedPlan && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setShowConfirmation(true)}
                                    className="w-full cyber-button px-8"
                                >
                                    Continue
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {renderPaymentStatus()}
            </section>
            <AppFooter />
        </>
    );
};

export default Create;