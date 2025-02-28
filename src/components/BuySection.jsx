import React from 'react';
import {Link} from 'react-router-dom';
import {Zap, TrendingUp, Rocket, ChevronRight, DollarSign} from 'lucide-react';
const BuySection = () => {
    return (
        <section className="w-full max-w-screen-lg mx-auto mb-10">

        <div className="premium-panel p-4 md:p-8 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="grid grid-cols-1 gap-8 items-center">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                                <Zap className="w-8 h-8 text-cyan-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-medium neon-text">Power Up with BOLT Tokens</h2>
                                <p className="text-gray-400">Unlock premium features and maximize your rewards</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-gray-200 font-medium">Higher Rewards Potential</p>
                                    <p className="text-sm text-gray-400">
                                        More BOLT tokens means bigger stakes in treasure chests and higher potential returns.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <Rocket className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-gray-200 font-medium">Exclusive Access</p>
                                    <p className="text-sm text-gray-400">
                                        Unlock premium treasure chests and special events only available to BOLT holders.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <DollarSign className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-gray-200 font-medium">Limited Time Offer</p>
                                    <p className="text-sm text-gray-400">
                                        Get 20% bonus BOLT tokens on all purchases made before May 1st!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                        <Link
                            to="/buy"
                            className="cyber-button inline-flex items-center justify-between space-x-2 px-8 py-3 text-base"
                        >
                            <span>Buy BOLT Tokens</span>
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </section>
    )
}

export default BuySection;