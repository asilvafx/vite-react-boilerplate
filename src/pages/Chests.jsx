import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Filter, Trophy, Timer, Users, Coins, ArrowLeft, Plus, User } from 'lucide-react';
import { getUserChests, getAvailableChests, prizeDistributions } from '../lib/chests'; // Import prizeDistributions
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import { useUser  } from '../context/UserProvider';
import { loadConfig } from "../lib/site";

const Chests = () => {
    const { userData } = useUser ();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('my-chests');

    const userChests = getUserChests();
    const availableChests = getAvailableChests();

    const getFilteredChests = () => {
        const chests = activeTab === 'my-chests' ? userChests : availableChests;
        return chests.filter(chest => {
            const matchesSearch = chest.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                chest.plan.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' ||
                (statusFilter === 'active' && chest.status === 'open') ||
                (statusFilter === 'completed' && chest.status === 'completed');
            return matchesSearch && matchesStatus;
        });
    };

    const filteredChests = getFilteredChests();

    return (
        <>
            <section className="w-full max-w-screen-lg mx-auto my-10">
                <AppHeader backUrl="/dashboard" />
                <SectionTitle title="Chests" />
                <div className="premium-panel p-4 md:p-6 rounded-xl">
                    {/* Tabs */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4 mb-6">
                        <button
                            onClick={() => setActiveTab('my-chests')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'my-chests'
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <User  className="w-4 h-4" />
                            <span>My Chests</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'available'
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <Box className="w-4 h-4" />
                            <span>Available Chests</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-cyan-500/10 rounded-lg">
                                {activeTab === 'my-chests' ? (
                                    <User  className="w-6 h-6 premium-icon" />
                                ) : (
                                    <Box className="w-6 h-6 premium-icon" />
                                )}
                            </div>
                            <h1 className="text-2xl font-medium">
                                {activeTab === 'my-chests' ? 'Your Chests' : 'Available Chests'}
                            </h1>
                        </div>
                        <div className="ms-auto">
                            <Link to="/create" className="flex gap-2 items-center cyber-button">
                                <Plus className="w-4 h-4" />
                                <span className="hidden md:block">Create new</span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <input
                                className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                type="text"
                                placeholder="Search chests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2 min-w-[200px]">
                            <Filter className="text-gray-400" />
                            <select
                                className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredChests.map(chest => {
                            const totalPrizePool = prizeDistributions[chest.plan.name]?.total || 0; // Get total prize pool

                            return (
                                <div key={chest.id} className="premium-panel p-6 rounded-lg hover:bg-cyan-500/5 transition-colors">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <div className="w-full">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-xl font-bold neon-text">Chest #{chest.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-br ${chest.plan.color}`}>
                                                    {chest.plan.name}
                                                </span>
                                                {chest.status === 'completed' && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-400 flex items-center mb-4">
                                                <User  className="w-4 h-4 mr-2" />
                                                Created by {chest.creator}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="premium-panel p-3 rounded-lg">
                                                    <p className="text-sm text-gray-400 mb-1">Tickets Sold</p>
                                                    <p className="font-medium flex items-center">
                                                        <Timer className="w-4 h-4 mr-2 premium-icon" />
                                                        {chest.ticketsSold}/{chest.plan.maxTickets}
                                                    </p>
                                                </div>
                                                <div className="premium-panel p-3 rounded-lg">
                                                    <p className="text-sm text-gray-400 mb-1">Participants</p>
                                                    <p className="font-medium flex items-center">
                                                        < Users className="w-4 h-4 mr-2 premium-icon" />
                                                        {chest.participants.length}
                                                    </p>
                                                </div>
                                                <div className="premium-panel p-3 rounded-lg">
                                                    <p className="text-sm text-gray-400 mb-1">Ticket Price</p>
                                                    <p className="font-medium flex items-center">
                                                        <Coins className="w-4 h-4 mr-2 premium-icon" />
                                                        {chest.ticketPrice} {loadConfig.WEB3_CONTRACT_SYMBOL}
                                                    </p>
                                                </div>
                                                <div className="premium-panel p-3 rounded-lg">
                                                    <p className="text-sm text-gray-400 mb-1">Prize Pool</p>
                                                    <p className="premium-gradient-text font-medium flex items-center">
                                                        <Trophy className="w-4 h-4 mr-2 premium-icon" />
                                                        {totalPrizePool} {loadConfig.WEB3_CONTRACT_SYMBOL} {/* Display total prize pool */}
                                                    </p>
                                                </div>
                                            </div>

                                            {chest.status === 'completed' && chest.winners && (
                                                <div className="mt-4 premium-panel p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-amber-500/5">
                                                    <h4 className="text-sm font-medium text-yellow-400 mb-2">Winners</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                        {chest.winners.map((winner, index) => (
                                                            <div key={index} className="flex items-center justify-between text-sm">
                                                                <span className="text-gray-400">#{index + 1}</span>
                                                                <span className="font-mono text-gray-300">{winner.address}</span>
                                                                <span className="text-yellow-400">{winner.reward} TOKENS</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid mt-6">
                                        <Link
                                            to={`/join/${chest.id}`}
                                            className="w-full cyber-button min-w-[150px] text-center"
                                        >
                                            {activeTab === 'my-chests' ? 'View Details' : 'Join Chest'}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredChests.length === 0 && (
                            <div className="text-center py-12">
                                <Box className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400">No chests found</p>
                                {activeTab === 'my-chests' && (
                                    <Link to="/create" className="cyber-button mt-4">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Your First Chest
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <AppFooter />
        </>
    );
};

export default Chests;