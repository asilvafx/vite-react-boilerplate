import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Plus, Box, Trophy, TrendingUp, Timer, Users, Sparkles } from 'lucide-react';
import AppFooter from "../components/AppFooter";

const Dashboard = () => {
    const featuredChests = [
        { id: 1, name: "Mega Jackpot", price: 10, jackpot: 5000, timeLeft: "12:30:45", participants: 42 },
        { id: 2, name: "Lucky Strike", price: 5, jackpot: 2500, timeLeft: "06:15:30", participants: 28 },
        { id: 3, name: "Neon Dreams", price: 1, jackpot: 1000, timeLeft: "23:45:00", participants: 15 },
    ];

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="premium-panel rounded-2xl text-center py-24 px-8 my-10 w-full max-w-screen-lg mx-auto">
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
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 w-full max-w-screen-lg mx-auto">
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
                            Winners
                        </h3>
                        <p className="premium-stats-value">24</p>
                    </div>
                </div>
            </section>

            {/* Featured Chests */}
            <section className="mb-10 w-full max-w-screen-lg mx-auto">
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
                                    <span className="flex items-center text-gray-400">
                                        <Timer className="w-4 h-4 mr-2 premium-icon"/>
                                        Time Left
                                    </span>
                                    <span className="text-neutral-100 font-medium">{chest.timeLeft}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-400">
                                        <Users className="w-4 h-4 mr-2 premium-icon"/>
                                        Participants
                                    </span>
                                    <span className="text-neutral-100 font-medium">{chest.participants}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Ticket Price</span>
                                    <span className="text-neutral-100 font-medium">{chest.price} TOKENS</span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-gray-400">Jackpot</span>
                                    <span className="premium-gradient-text text-lg">{chest.jackpot} $BOLT</span>
                                </div>
                            </div>
                            <Link to={`/treasure-hunt/${chest.id}`}>
                                <button className="cyber-button w-full mt-8 group-hover:neon-text-intense">
                                    Join Chest
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Winners */}
            <section className="mb-10 w-full max-w-screen-lg mx-auto">
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

            <AppFooter />
        </>
    );
};

export default Dashboard;