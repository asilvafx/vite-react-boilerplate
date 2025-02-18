import React, { useState } from 'react';
import { Search, Filter, Clock, Coins, Users, Trophy, Sparkles } from 'lucide-react';
import {Link} from 'react-router-dom';
import { TextInput, Select } from 'flowbite-react';
import Header from '../components/Header';
import AppFooter from "../components/AppFooter";
import GoBack from "../components/GoBack.jsx";

const Chests = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');

    const chests = [
        {
            id: 1,
            name: "Cyber Jackpot #1337",
            creator: "CyberPunk_42",
            ticketPrice: 5,
            jackpot: 2500,
            timeLeft: "14:30:22",
            participants: 42,
            maxTickets: 100,
            type: "premium"
        },
        {
            id: 2,
            name: "Neon Dreams Vol.2",
            creator: "NeonRider",
            ticketPrice: 1,
            jackpot: 500,
            timeLeft: "06:15:45",
            participants: 28,
            maxTickets: 50,
            type: "standard"
        },
        {
            id: 3,
            name: "Digital Fortune",
            creator: "ByteMaster",
            ticketPrice: 10,
            jackpot: 5000,
            timeLeft: "23:59:59",
            participants: 15,
            maxTickets: 200,
            type: "mini"
        }
    ];

    const filteredChests = chests.filter(chest => {
        const matchesSearch = chest.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = priceFilter === 'all' || chest.ticketPrice.toString() === priceFilter;
        return matchesSearch && matchesPrice;
    });

    return (
        <>
        <Header />
            <section className="w-full max-w-screen-lg mx-auto my-10">

                <div className="flex items-center justify-start gap-4 mb-8">

                    <GoBack url="/dashboard"/>
                    <h1 className="text-3xl font-bold neon-text">Join a Chest</h1>
                </div>

                <div className="premium-panel p-6 rounded-xl mb-8">

                    <h2 className="text-2xl font-bold neon-text mb-8">Search</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <TextInput
                                type="text"
                                icon={Search}
                                placeholder="Search chests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-800"
                            />
                        </div>
                        <div className="flex items-center space-x-2 min-w-[200px]">
                            <Filter className="text-gray-400"/>
                            <Select
                                value={priceFilter}
                                onChange={(e) => setPriceFilter(e.target.value)}
                                className="bg-gray-800"
                            >
                                <option value="all">All Prices</option>
                                <option value="1">1 TOKEN</option>
                                <option value="5">5 TOKENS</option>
                                <option value="10">10 TOKENS</option>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {filteredChests.map(chest => (
                        <div key={chest.id}
                             className="premium-panel p-6 rounded-xl hover:scale-[1.01] transition-transform">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-xl font-bold neon-text">{chest.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${chest.type === 'premium' ? 'bg-purple-500/20 text-purple-300' :
                                            chest.type === 'standard' ? 'bg-blue-500/20 text-blue-300' :
                                                'bg-emerald-500/20 text-emerald-300'}`}>
                    {chest.type.toUpperCase()}
                  </span>
                                    </div>
                                    <p className="text-gray-400 flex items-center mb-4">
                                        <Trophy className="w-4 h-4 mr-2 premium-icon"/>
                                        Created by {chest.creator}
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="premium-panel p-3 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Time Left</p>
                                            <p className="font-medium flex items-center">
                                                <Clock className="w-4 h-4 mr-2 premium-icon"/>
                                                {chest.timeLeft}
                                            </p>
                                        </div>
                                        <div className="premium-panel p-3 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Participants</p>
                                            <p className="font-medium flex items-center">
                                                <Users className="w-4 h-4 mr-2 premium-icon"/>
                                                {chest.participants}/{chest.maxTickets}
                                            </p>
                                        </div>
                                        <div className="premium-panel p-3 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Ticket Price</p>
                                            <p className="font-medium flex items-center">
                                                <Coins className="w-4 h-4 mr-2 premium-icon"/>
                                                {chest.ticketPrice} TOKENS
                                            </p>
                                        </div>
                                        <div className="premium-panel p-3 rounded-lg">
                                            <p className="text-sm text-gray-400 mb-1">Jackpot</p>
                                            <p className="premium-gradient-text font-medium flex items-center">
                                                <Sparkles className="w-4 h-4 mr-2 premium-icon"/>
                                                {chest.jackpot} TOKENS
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`/treasure-hunt/${chest.id}`}
                                >
                                    <button className="cyber-button min-w-[150px]">
                                       Hunt
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <AppFooter/>
        </>
    );
};

export default Chests;