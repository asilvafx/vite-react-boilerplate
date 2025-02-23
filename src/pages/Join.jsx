import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Coins, Trophy, Users, AlertCircle, ArrowLeft, Timer } from 'lucide-react';
import { getChestDetails, calculateRewards } from '../lib/chests';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import {useUser} from '../context/UserProvider';

const Join = () => {

const {userData} = useUser();
    const { id } = useParams();
    const [ticketCount, setTicketCount] = useState(1);
    const [chestData, setChestData] = useState(null);

    useEffect(() => {
        // In a real app, fetch chest data from API
        const details = getChestDetails(`chest_${id}`);
        if (details) {
            setChestData(details);
        }
    }, [id]);

    const handlePurchaseTicket = () => {
        // This would be connected to your backend
        console.log('Purchase tickets:', ticketCount);
    };

    if (!chestData) return null;

    const progressPercentage = (chestData.ticketsSold / chestData.plan.maxTickets) * 100;
    const remainingTickets = chestData.plan.maxTickets - chestData.ticketsSold;
    const rewards = calculateRewards(chestData.plan.id);

    return (
        <>
            <section className="w-full max-w-screen-lg mx-auto my-10">
                <AppHeader backUrl="/dashboard"/>
                <SectionTitle title="Chests"/>

                <div className="premium-panel p-4 md:p-6 rounded-xl mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold neon-text mb-2">Chest #{id}</h1>
                            <p className="text-gray-400">Created by {chestData.creator}</p>
                        </div>
                        <span
                            className={`px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-br ${chestData.plan.color}`}>
            {chestData.plan.name}
          </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Progress: {chestData.ticketsSold} / {chestData.plan.maxTickets} tickets sold</span>
                            <span>{progressPercentage.toFixed(1)}% Complete</span>
                        </div>
                        <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                                style={{width: `${progressPercentage}%`}}
                            />
                        </div>
                    </div>

                    {/* Chest Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="premium-panel p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Tickets Left</p>
                            <p className="font-medium flex items-center">
                                <Timer className="w-4 h-4 mr-2 premium-icon"/>
                                {remainingTickets}
                            </p>
                        </div>
                        <div className="premium-panel p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Participants</p>
                            <p className="font-medium flex items-center">
                                <Users className="w-4 h-4 mr-2 premium-icon"/>
                                {chestData.participants.length}
                            </p>
                        </div>
                        <div className="premium-panel p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Ticket Price</p>
                            <p className="font-medium flex items-center">
                                <Coins className="w-4 h-4 mr-2 premium-icon"/>
                                10 TOKENS
                            </p>
                        </div>
                        <div className="premium-panel p-4 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Prize Pool</p>
                            <p className="premium-gradient-text font-medium flex items-center">
                                <Trophy className="w-4 h-4 mr-2 premium-icon"/>
                                {Math.floor(chestData.plan.price * 0.9)} TOKENS
                            </p>
                        </div>
                    </div>

                    {/* Prize Distribution */}
                    <div className="premium-panel p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-medium mb-4">Prize Distribution</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {rewards.map((reward, index) => (
                                <div key={index}
                                     className="premium-panel p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-amber-500/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Trophy className={`w-5 h-5 ${
                                                index === 0 ? 'text-yellow-400' :
                                                    index === 1 ? 'text-gray-400' :
                                                        index === 2 ? 'text-amber-600' : 'text-blue-400'
                                            }`}/>
                                            <span className="text-gray-300">{index + 1}st Place</span>
                                        </div>
                                        <span className="font-medium text-cyan-400">{reward} TOKENS</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ticket Purchase */}
                    <div className="premium-panel p-6 rounded-lg">
                        <h2 className="text-xl font-medium mb-6">Buy Tickets</h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                                        className="cyber-button px-3 py-2"
                                        disabled={ticketCount <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-medium">{ticketCount}</span>
                                    <button
                                        onClick={() => setTicketCount(Math.min(chestData.plan.maxTicketsPerUser, ticketCount + 1))}
                                        className="cyber-button px-3 py-2"
                                        disabled={ticketCount >= chestData.plan.maxTicketsPerUser}
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-gray-400">
                Total: {ticketCount * 10} TOKENS
              </span>
                            </div>

                            <div className="premium-panel p-4 rounded-lg bg-cyan-500/5">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5"/>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-300">
                                            You can buy up to {chestData.plan.maxTicketsPerUser} tickets for this chest.
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Winners will be automatically selected and rewards distributed when all
                                            tickets are sold.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePurchaseTicket}
                                className="cyber-button w-full"
                                disabled={remainingTickets === 0}
                            >
                                {remainingTickets === 0 ? 'No Tickets Available' : 'Purchase Tickets'}
                            </button>
                        </div>
                    </div>

                    {/* Participants List */}
                    <div className="premium-panel p-6 rounded-lg mt-8">
                        <h2 className="text-xl font-medium mb-4">Current Participants</h2>
                        <div className="space-y-4">
                            {chestData.participants.map((participant, index) => (
                                <div key={index}
                                     className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-cyan-400">
                        {participant.address.slice(2, 4).toUpperCase()}
                      </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-200">{participant.address}</p>
                                                <p className="text-sm text-gray-400">
                                                    {participant.tickets.length} ticket{participant.tickets.length !== 1 ? 's' : ''} purchased
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {chestData.participants.length === 0 && (
                                <div className="text-center py-8">
                                    <Users className="w-12 h-12 text-gray-500 mx-auto mb-4"/>
                                    <p className="text-gray-400">No participants yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <AppFooter/>
        </>
    )
}

export default Join;