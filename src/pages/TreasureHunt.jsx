import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Coins, Trophy, Timer, Users, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'; // Import icons for collapse
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import GoBack from '../components/GoBack';

const TreasureHunt = () => {
    const { id } = useParams();
    const [selectedTile, setSelectedTile] = useState(null);
    const [revealedTiles, setRevealedTiles] = useState(new Set());
    const [userTickets, setUserTickets] = useState([]);
    const [ticketCount, setTicketCount] = useState(1);
    const [chestData, setChestData] = useState(null);
    const [isGridVisible, setIsGridVisible] = useState(true); // State to manage grid visibility

    const MAX_TICKETS = 10;
    const gridSize = { rows: 5, cols: 5 }; // 5 rows and 10 columns
    const totalTiles = gridSize.rows * gridSize.cols;

    useEffect(() => {
        // In a real app, fetch chest data from API
        // For now, using mock data
        setChestData({
            id: parseInt(id),
            name: "Cyber Jackpot #1337",
            ticketPrice: 5,
            jackpot: 2500,
            timeLeft: "14:30:22",
            participants: 42,
            maxParticipants: 100,
        });
    }, [id]);

    const handlePurchaseTicket = () => {
        if (userTickets.length + ticketCount > MAX_TICKETS) {
            return; // Don't allow purchase if it would exceed the limit
        }

        // This would be connected to your backend
        const newTickets = Array(ticketCount).fill(0).map(() => {
            // Generate random number between 0 and totalTiles for each ticket
            return Math.floor(Math.random() * totalTiles);
        });
        setUserTickets([...userTickets, ...newTickets]);
    };

    const handleTileClick = (index) => {
        if (revealedTiles.has(index) || userTickets.length === 0) return;

        setSelectedTile(index);
        setRevealedTiles(new Set([...revealedTiles, index]));

        // Check if any ticket matches this tile
        const isWinner = userTickets.includes(index);
        if (isWinner) {
            // Handle win condition
            console.log('Jackpot found!');
        }
    };

    const remainingTickets = MAX_TICKETS - userTickets.length;

    if (!chestData) return null;

    return (
        <>
            <Header />
            <section className="w-full max-w-screen-lg mx-auto my-10">
                <div className="flex items-center justify-start gap-4 mb-8">

                    <GoBack url="/chests"/>
                    <h1 className="text-3xl font-bold neon-text">Treasure Hunt</h1>
                </div>

                <div className="premium-panel p-6 rounded-xl mb-8">
                    <h1 className="text-3xl font-bold neon-text mb-2">{chestData.name}</h1>
                    <p className="text-gray-400">Find the treasure and win the jackpot!</p>
                </div>

                {/* Collapse Button */}
                <button
                    onClick={() => setIsGridVisible(!isGridVisible)}
                    className="cyber-button mb-4 flex md:hidden items-center"
                >
                    {isGridVisible ? (
                        <>
                            <ChevronUp className="w-4 h-4 mr-2"/>
                            Collapse Grid
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4 mr-2"/>
                            Expand Grid
                        </>
                    )}
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side - Grid */}
                    {isGridVisible && (
                        <div className="premium-panel p-6 rounded-xl h-fit">
                            <h2 className="text-xl font-medium mb-6 neon-text">Treasure Map</h2>
                            <div className="grid grid-cols-10 md:grid-cols-5 gap-3"> {/* Updated to 10 columns */}
                                {Array.from({length: totalTiles}).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTileClick(index)}
                                        disabled={revealedTiles.has(index) || userTickets.length === 0}
                                        className={`
                  aspect-square rounded-lg transition-all duration-300
                  ${revealedTiles.has(index)
                                            ? userTickets.includes(index)
                                                ? 'bg-green-500/20 border-green-500/40'
                                                : 'bg-gray-800/50 border-gray-700/50'
                                            : 'premium-panel hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 active:scale-95'}
                  ${selectedTile === index ? 'ring-2 ring-cyan-400/50' : ''}
                  ${userTickets.length === 0 ? 'cursor-not-allowed opacity-50' : ''}
                `}
                                    >
                                        {revealedTiles.has(index) && (
                                            <div className="flex items-center justify-center h-full">
                                                {userTickets.includes(index) ? (
                                                    <Trophy className="w-6 h-6 text-green-400"/>
                                                ) : (
                                                    <span className="text-gray-500">×</span>
                                                )}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Right Side - Info & Controls */}
                    <div className="space-y-6">
                        {/* Chest Info */}
                        <div className="premium-panel p-6 rounded-xl">
                            <h2 className="text-xl font-medium mb-6 neon-text">Chest Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="premium-panel p-3 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-1">Time Left</p>
                                    <p className="font-medium flex items-center">
                                        <Timer className="w-4 h-4 mr-2 premium-icon"/>
                                        {chestData.timeLeft}
                                    </p>
                                </div>
                                <div className="premium-panel p-3 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-1">Participants</p>
                                    <p className="font-medium flex items-center">
                                        <Users className="w-4 h-4 mr-2 premium-icon"/>
                                        {chestData.participants}/{chestData.maxParticipants}
                                    </p>
                                </div>
                                <div className="premium-panel p-3 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-1">Ticket Price</p>
                                    <p className="font-medium flex items-center">
                                        <Coins className="w-4 h-4 mr-2 premium-icon"/>
                                        {chestData.ticketPrice} TOKENS
                                    </p>
                                </div>
                                <div className="premium-panel p-3 rounded-lg">
                                    <p className="text-sm text-gray-400 mb-1">Jackpot</p>
                                    <p className="premium-gradient-text font-medium flex items-center">
                                        <Trophy className="w-4 h-4 mr-2 premium-icon"/>
                                        {chestData.jackpot} TOKENS
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Purchase */}
                        <div className="premium-panel p-6 rounded-xl">
                            <h2 className="text-xl font-medium mb-6 neon-text">Buy Tickets</h2>
                            <div className="space-y-4">
                                {remainingTickets > 0 ? (
                                    <>
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
                                                    onClick={() => setTicketCount(Math.min(remainingTickets, ticketCount + 1))}
                                                    className="cyber-button px-3 py-2"
                                                    disabled={ticketCount >= remainingTickets}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-gray-400">
                                                Total: {ticketCount * chestData.ticketPrice} TOKENS
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-400 flex items-center">
                                            <AlertCircle className="w-4 h-4 mr-2"/>
                                            You can buy up to {remainingTickets} more
                                            ticket{remainingTickets !== 1 ? 's' : ''}
                                        </div>
                                        <button
                                            onClick={handlePurchaseTicket}
                                            className="cyber-button w-full"
                                            disabled={ticketCount > remainingTickets}
                                        >
                                            Purchase Tickets
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                                        <p className="text-gray-400">
                                            {`You've reached the maximum limit of ${MAX_TICKETS} tickets for this chest.`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User's Tickets */}
                        {userTickets.length > 0 && (
                            <div className="premium-panel p-6 rounded-xl">
                                <h2 className="text-xl font-medium mb-4 neon-text">Your Tickets</h2>
                                <p className="text-gray-400">
                                    You have {userTickets.length} ticket{userTickets.length !== 1 ? 's' : ''} remaining.
                                    Click on the grid tiles to reveal their contents!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <AppFooter/>
        </>
    );
};

export default TreasureHunt;