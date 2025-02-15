import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Box, Trophy, TrendingUp, Timer, Users, Sparkles, Wallet, BarChart as ChartBar, Target, Coins, ArrowUpRight, Gauge } from 'lucide-react';

const Dashboard = () => {

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

    const featuredChests = [
        { id: 1, name: "Mega Jackpot", price: 10, jackpot: 5000, timeLeft: "12:30:45", participants: 42 },
        { id: 2, name: "Lucky Strike", price: 5, jackpot: 2500, timeLeft: "06:15:30", participants: 28 },
        { id: 3, name: "Neon Dreams", price: 1, jackpot: 1000, timeLeft: "23:45:00", participants: 15 },
    ];


    return (
        <>
            <Header />
            {/* User Stats Section */}
            <section className="premium-panel rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-medium neon-text mb-2">Your Account</h2>
                    <p className="text-gray-400">Level {mockUser.level} Member</p>
                </div>
                <div className="flex items-center space-x-2 premium-panel px-6 py-3 rounded-xl mt-4 md:mt-0">
                    <Wallet className="w-5 h-5 premium-icon" />
                    <span className="text-2xl font-medium tracking-wide neon-text">
            {mockUser.balance} TOKENS
            </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Performance Stats */}
                <div className="premium-panel p-6 rounded-xl space-y-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <ChartBar className="w-5 h-5 premium-icon" />
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
                                    style={{ width: `${mockUser.stats.winRate}%` }}
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
                            <Target className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-medium">Activity</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="premium-panel p-3 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Created</p>
                            <p className="font-medium flex items-center">
                                <Box className="w-4 h-4 mr-2 premium-icon" />
                                {mockUser.stats.chestsCreated}
                            </p>
                        </div>
                        <div className="premium-panel p-3 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Active</p>
                            <p className="font-medium flex items-center">
                                <Timer className="w-4 h-4 mr-2 premium-icon" />
                                {mockUser.stats.activeChests}
                            </p>
                        </div>
                        <div className="premium-panel p-3 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Won</p>
                            <p className="font-medium flex items-center">
                                <Trophy className="w-4 h-4 mr-2 premium-icon" />
                                {mockUser.stats.chestsWon}
                            </p>
                        </div>
                        <div className="premium-panel p-3 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Returns</p>
                            <p className="font-medium flex items-center">
                                <ArrowUpRight className="w-4 h-4 mr-2 premium-icon" />
                                {mockUser.stats.totalReturns}
                            </p>
                        </div>
                    </div>
                </div>

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
            </div>
            </section>
            {/* Hero Section */}
            <section className="premium-panel rounded-2xl text-center py-24 px-8">
                <div className="relative">
                    <Sparkles
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 premium-icon-glow"/>
                    <h1 className="text-6xl font-medium tracking-tight neon-text-intense mb-8 max-w-3xl mx-auto leading-tight">
                        Create or Join Digital Treasure Chests
                    </h1>
                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                        Enter the future of digital rewards. Create your own chests or join existing ones
                        for a chance to win massive jackpots.
                    </p>
                    <div className="flex justify-center space-x-8">
                        <Link to="/create" className="cyber-button flex items-center group">
                            <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-500"/>
                            Create a Chest
                        </Link>
                        <Link to="/join" className="cyber-button flex items-center group">
                            <Box className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-500"/>
                            Join a Chest
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="premium-stats-card group">
                    <div className="flex-1 text-center">
                        <h3 className="text-lg font-medium text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            Active Chests
                        </h3>
                        <p className="premium-stats-value">156</p>
                    </div>
                </div>
                <div className="premium-stats-card group">
                    <div className="flex-1 text-center">
                        <h3 className="text-lg font-medium text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            Total Jackpot
                        </h3>
                        <p className="premium-stats-value">50,000</p>
                    </div>
                </div>
                <div className="premium-stats-card group">
                    <div className="flex-1 text-center">
                        <h3 className="text-lg font-medium text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                            Winners Today
                        </h3>
                        <p className="premium-stats-value">24</p>
                    </div>
                </div>
            </section>

            {/* Featured Chests */}
            <section>
                <div className="flex items-center mb-10">
                    <TrendingUp className="w-8 h-8 premium-icon mr-3"/>
                    <h2 className="text-3xl font-medium neon-text">Featured Chests</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredChests.map(chest => (
                        <div key={chest.id} className="premium-card group">
                            <div className="flex items-start justify-between mb-6">
                                <h3 className="text-xl font-medium group-hover:neon-text transition-all duration-300">
                                    {chest.name}
                                </h3>
                                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                                    <span className="text-sm font-medium text-cyan-300">#{chest.id}</span>
                                </div>
                            </div>
                            <div className="space-y-4 text-gray-400">
                                <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Timer className="w-4 h-4 mr-2 premium-icon"/>
                Time Left
              </span>
                                    <span className="text-white font-medium">{chest.timeLeft}</span>
                                </div>
                                <div className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2 premium-icon"/>
                Participants
              </span>
                                    <span className="text-white font-medium">{chest.participants}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Ticket Price</span>
                                    <span className="text-white font-medium">{chest.price} TOKENS</span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span>Jackpot</span>
                                    <span className="premium-gradient-text text-lg">{chest.jackpot} TOKENS</span>
                                </div>
                            </div>
                            <button className="cyber-button w-full mt-8 group-hover:neon-text-intense">
                                Join Chest
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Winners */}
            <section>
                <div className="flex items-center mb-10">
                    <Trophy className="w-8 h-8 premium-icon mr-3"/>
                    <h2 className="text-3xl font-medium neon-text">Recent Winners</h2>
                </div>
                <div className="premium-panel rounded-xl overflow-hidden">
                    <div className="divide-y divide-cyan-500/10">
                        {[1, 2, 3].map(i => (
                            <div key={i}
                                 className="flex items-center justify-between p-8 hover:bg-cyan-500/5 transition-colors group">
                                <div>
                                    <p className="font-medium text-lg mb-2 group-hover:neon-text transition-colors">
                                        User_{Math.random().toString(36).substr(2, 6)}
                                    </p>
                                    <p className="text-gray-400 flex items-center">
                                        <Trophy className="w-4 h-4 mr-2 premium-icon"/>
                                        Won Mega Jackpot #{i}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="premium-gradient-text text-2xl font-medium mb-1">
                                        {1000 * i} TOKENS
                                    </p>
                                    <p className="text-sm text-gray-400">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Dashboard;