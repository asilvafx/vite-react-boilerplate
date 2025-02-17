import React, {useState} from 'react';
import {ArrowUpRight, BarChart as ChartBar, Globe, Shield, Box, Gauge, Plus, Target, Timer, Trophy} from "lucide-react";
import {Link} from "react-router-dom";
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';

const Account = () => {


    // Mock user data - replace with actual user data from your auth system
    const mockUser = {
        balance: 1000,
        level: 1,
        stats: {
            chestsCreated: 12,
            chestsWon: 3,
            totalReturns: 5000,
            activeChests: 2,
            winRate: 25, // percentage
            highestWin: 1500
        }
    };


    const [isVerified, setIsVerified] = useState(false);

    const handleWorldIDVerification = () => {
        // This will be implemented later with WorldID
        console.log('WorldID verification clicked');
    };


    return (
        <>
            <Header />
            {/* User Stats Section */}
            <section className="my-10 w-full max-w-screen-lg mx-auto">
                <h1 className="text-3xl font-bold neon-text mb-8">My Account</h1>

                {/* WorldID Verification Banner */}
                {!isVerified && (
                    <div className="premium-panel p-6 rounded-xl mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"/>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <Globe className="w-6 h-6 premium-icon"/>
                                </div>
                                <h2 className="text-xl font-medium">Verify Your Humanity</h2>
                            </div>

                            <p className="text-gray-400 mb-6 max-w-2xl">
                                Verify your humanity using WorldID and receive <span
                                className="text-cyan-400 font-medium">50 TOKENS</span> as a reward.
                                This helps us maintain a fair and bot-free environment.
                            </p>

                            <button
                                onClick={handleWorldIDVerification}
                                className="cyber-button flex items-center space-x-2 group"
                            >
                                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"/>
                                <span>Verify with WorldID</span>
                            </button>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Performance Stats */}
                    <div className="premium-panel p-6 rounded-xl space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                <ChartBar className="w-5 h-5 premium-icon"/>
                            </div>
                            <h3 className="text-lg font-medium">Performance</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                    <span>Win Rate</span>
                                    <span className="text-cyan-400">{mockUser.stats.winRate}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-cyan-500 rounded-full h-2"
                                        style={{width: `${mockUser.stats.winRate}%`}}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Highest Win</span>
                                <span className="font-medium text-cyan-300">{mockUser.stats.highestWin} TOKENS</span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Stats */}
                    <div className="premium-panel p-6 rounded-xl space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Target className="w-5 h-5 text-purple-400"/>
                            </div>
                            <h3 className="text-lg font-medium">Activity</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="premium-panel p-3 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Created</p>
                                <p className="font-medium flex items-center">
                                    <Box className="w-4 h-4 mr-2 premium-icon"/>
                                    {mockUser.stats.chestsCreated}
                                </p>
                            </div>
                            <div className="premium-panel p-3 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Active</p>
                                <p className="font-medium flex items-center">
                                    <Timer className="w-4 h-4 mr-2 premium-icon"/>
                                    {mockUser.stats.activeChests}
                                </p>
                            </div>
                            <div className="premium-panel p-3 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Won</p>
                                <p className="font-medium flex items-center">
                                    <Trophy className="w-4 h-4 mr-2 premium-icon"/>
                                    {mockUser.stats.chestsWon}
                                </p>
                            </div>
                            <div className="premium-panel p-3 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Returns</p>
                                <p className="font-medium flex items-center">
                                    <ArrowUpRight className="w-4 h-4 mr-2 premium-icon"/>
                                    {mockUser.stats.totalReturns}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-10 w-full max-w-screen-lg mx-auto">
            {/* Quick Actions */}
                <div className="premium-panel p-6 rounded-xl space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Gauge className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-medium">Quick Actions</h3>
                    </div>
                    <div className="space-y-3">
                        <Link to="/create" className="cyber-button w-full flex items-center justify-center">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Chest
                        </Link>
                        <Link to="/join" className="cyber-button w-full flex items-center justify-center">
                            <Box className="w-4 h-4 mr-2" />
                            Join Chest
                        </Link>
                    </div>
                </div>
            </section>
            <AppFooter />
        </>
    );
}

export default Account;