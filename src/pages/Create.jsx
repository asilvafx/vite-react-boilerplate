import React, { useState } from 'react';
import { ArrowLeft, Shield, Zap, Rocket, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppFooter from "../components/AppFooter";

// Mock user data - replace with actual user data from your auth system
const mockUser = {
    level: 1,
    chestsWon: 1
};

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


const Create = () => {
    const [selectedPlan, setSelectedPlan] = useState('');

    const remainingWinsNeeded = 3 - mockUser.chestsWon;
    const isLevelTooLow = mockUser.level < 0;

    if (isLevelTooLow) {
        return (
            <>
            <section className="w-full max-w-screen-lg mx-auto my-10">
                <Link to="/" className="inline-flex items-center cyber-button mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <div className="premium-panel p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                        <Lock className="w-8 h-8 text-cyan-400 mr-3" />
                        <h1 className="text-3xl font-bold neon-text">Level 2 Required</h1>
                    </div>

                    <Alert color="warning" className="mb-6">
                        <div className="font-medium">You need to reach Level 2 to create chests</div>
                        <div className="mt-2">
                            Win {remainingWinsNeeded} more {remainingWinsNeeded === 1 ? 'chest' : 'chests'} to advance to Level 2
                        </div>
                    </Alert>

                    <div className="space-y-6">
                        <div className="premium-panel p-6 rounded-lg">
                            <h2 className="text-xl font-medium mb-4">Your Progress</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span>Current Level</span>
                                        <span className="text-cyan-400">Level {mockUser.level}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-cyan-500 rounded-full h-2"
                                            style={{ width: `${(mockUser.chestsWon / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-400">Chests Won: {mockUser.chestsWon}/3</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/join" className="cyber-button block text-center">
                            Join Available Chests
                        </Link>
                    </div>
                </div>
            </section>
            </>
        );
    }

    return (
        <>
        <Header />
        <section className="w-full max-w-screen-lg mx-auto relative my-10">

            <div>
                <h1 className="text-3xl font-bold neon-text mb-8">Create a New Chest</h1>

                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {chestPlans.map((plan) => {
                            const Icon = plan.icon;
                            return (
                                <div
                                    key={plan.id}
                                    className={`premium-card cursor-pointer ${
                                        selectedPlan === plan.id
                                            ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                                            : 'hover:border-cyan-400/30'
                                    }`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    <div className={`rounded-full w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br ${plan.color}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-medium mb-2 text-gray-200">{plan.name}</h3>
                                    <p className="text-2xl font-bold mb-4 neon-text">{plan.deposit} TOKENS</p>
                                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="text-sm text-gray-300 flex items-center">
                                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>

        <AppFooter />
        </>
    );
};

export default Create;