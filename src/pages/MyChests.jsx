import React from 'react';
import {ArrowUpRight, BarChart as ChartBar, Box, Target, Timer, Trophy} from "lucide-react";

const MyChests = () => {

    // Mock user data - replace with actual user data from your auth system
    const mockUser  = {
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
    
    return (
        <>
            <section className="my-10 w-full max-w-screen-lg mx-auto">
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

        </>
    )
}


export default MyChests;