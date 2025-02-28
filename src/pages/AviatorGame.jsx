import React, { useEffect, useRef, useState } from 'react'; 
import { AlertCircle, Clock, Users, Trophy, Wallet, History } from 'lucide-react';
import toast from 'react-hot-toast';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import { useUser  } from '../context/UserProvider';
import { loadConfig } from '../lib/site';

const AviatorGame = () => {
    const { userData } = useUser();
    const canvasRef = useRef(null);
    const [counter, setCounter] = useState(1.0);
    const [isFlying, setIsFlying] = useState(true);
    const [placedBet, setPlacedBet] = useState(false);
    const [cashedOut, setCashedOut] = useState(false);
    const [betAmount, setBetAmount] = useState('');
    const [balance, setBalance] = useState(3000);
    const [message, setMessage] = useState('Wait for the next round');
    const [counterDepo, setCounterDepo] = useState([1.01, 18.45, 2.02, 5.21, 1.22, 1.25, 2.03, 4.55, 65.11, 1.03, 1.10, 3.01, 8.85, 6.95, 11.01, 2.07, 4.05, 1.51, 1.02, 1.95, 1.05, 3.99, 2.89, 4.09, 11.20, 2.55]);
    const [randomStop, setRandomStop] = useState(Math.random() * (10 - 0.1) + 0.8);
    const animationIdRef = useRef(0);
    const dotPathRef = useRef([]);

    // Initialize the game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = 800;
        canvas.height = 250;

        // Load the airplane image
        const image = new Image();
        image.src = 'https://i.imgur.com/JRDw8l7.png'; // Using a placeholder image URL
        image.onload = () => {
            // Start the animation once the image is loaded
            draw(ctx, image, canvas);
        };

        // Clean up on unmount
        return () => {
            cancelAnimationFrame(animationIdRef.current);
        };
    }, []);

    // Draw function for animation
    const draw = (ctx, image, canvas) => {
        // Speed and direction
        let speedX = 3;
        let speedY = 1;
        let x = 0;
        let y = canvas.height;

        // Animation function
        const animate = () => {
            // Update counter
            setCounter(prev => {
                const newCounter = prev + 0.001;
                return newCounter;
            });

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update position
            x += speedX;
            if (counter < randomStop) {
                y -= speedY;
                y = canvas.height / 2 + 50 * Math.cos(x / 100);
                setIsFlying(true);
            } else {
                x = 0;
                y = 0;
                setIsFlying(false);
            }

            // Check if it's time to stop animation
            if (counter >= randomStop) {
                setMessage('Place your bet');
                cancelAnimationFrame(animationIdRef.current);

                // Update counter history
                setCounterDepo(prev => [counter.toFixed(2), ...prev.slice(0, 25)]);

                // Wait and restart
                setTimeout(() => {
                    setRandomStop(Math.random() * (10 - 0.1) + 0.8);
                    setCounter(1.0);
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    dotPathRef.current = [];
                    setCashedOut(false);
                    setIsFlying(true);
                    setMessage('');

                    if (!placedBet && cashedOut) {
                        setPlacedBet(false);
                    }

                    // Restart animation
                    animationIdRef.current = requestAnimationFrame(animate);
                }, 8000);

                return;
            }

            // Push current coordinates to path
            dotPathRef.current.push({ x, y });

            // Calculate canvas translation
            const canvasOffsetX = canvas.width / 2 - x;
            const canvasOffsetY = canvas.height / 2 - y;

            // Save current transformation
            ctx.save();
            ctx.translate(canvasOffsetX, canvasOffsetY);

            // Draw path
            for (let i = 1; i < dotPathRef.current.length; i++) {
                ctx.beginPath();
                ctx.strokeStyle = '#dc3545';
                ctx.moveTo(dotPathRef.current[i - 1].x, dotPathRef.current[i - 1].y);
                ctx.lineTo(dotPathRef.current[i].x, dotPathRef.current[i].y);
                ctx.stroke();
            }

            // Draw dot
            ctx.beginPath();
            ctx.fillStyle = '#dc3545';
            ctx.lineWidth = 5;
            ctx.arc(x, y, 1, 0, 2 * Math.PI);
            ctx.fill();

            // Draw image
            ctx.drawImage(image, x - 28, y - 78, 185, 85);

            // Restore transformation
            ctx.restore();

            // Request next frame
            animationIdRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        animationIdRef.current = requestAnimationFrame(animate);
    };

    // Handle bet button click
    const handleBetButtonClick = () => {
        if (placedBet) {
            cashOut();
        } else {
            placeBet();
        }

        if (!placedBet && !isFlying) {
            setMessage('Place your bet');
        }
    };

    // Place bet function
    const placeBet = () => {
        const betValue = parseFloat(betAmount);

        if (placedBet || betValue === 0 || isNaN(betValue) || isFlying || betValue > balance) {
            setMessage('Wait for the next round');
            return;
        }

        if ((counter >= randomStop) && !isFlying && (betValue <= balance)) {
            if (betValue && (betValue <= balance)) {
                setBalance(prev => prev - betValue);
                setPlacedBet(true);
                setMessage('Placed Bet');
            } else {
                setMessage('Insufficient balance to place bet');
            }
        } else {
            if (isFlying) {
                setMessage('Wait for the next round');
            }
        }
    };

    // Cash out function
    const cashOut = () => {
        if (cashedOut || parseFloat(betAmount) === 0) {
            setMessage('Wait for the next round');
            return;
        }

        if (counter < randomStop) {
            const winnings = parseFloat(betAmount) * counter;
            setBalance(prev => prev + winnings);
            setCashedOut(true);
            setPlacedBet(false);
            setMessage(`Bet cashed out: ${winnings.toFixed(2)}`);

            toast.success(`Cashed out ${winnings.toFixed(2)} tokens!`, {
                icon: '🚀',
                duration: 3000,
            });
        } else {
            setMessage("Can't cash out now");
        }
    };

    // Get class name for counter based on value
    const getCounterClassName = (value) => {
        if (value < 2.00) return 'bg-blue-500/20 text-blue-400';
        if (value >= 2 && value < 10) return 'bg-purple-500/20 text-purple-400';
        return 'bg-red-500/20 text-red-400';
    };

    return (
        <>
        <section className="w-full max-w-screen-lg mx-auto mb-10">

            <AppHeader backUrl="/dashboard" />
            <SectionTitle title={`Aviator Bet`} />


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="premium-panel p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg">
                                    <Trophy className="w-6 h-6 text-red-400" />
                                </div>
                                <h1 className="text-2xl font-medium neon-text">Aviator Game</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 premium-panel px-4 py-2 rounded-lg">
                                    <Wallet className="w-4 h-4 text-cyan-400" />
                                    <span className="font-medium text-cyan-400">{balance.toFixed(2)} €</span>
                                </div>
                            </div>
                        </div>

                        {/* Previous Multipliers */}
                        <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
                            {counterDepo.map((value, index) => (
                                <div
                                    key={index}
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCounterClassName(parseFloat(value.toString()))}`}
                                >
                                    {value}x
                                </div>
                            ))}
                        </div>

                        {/* Game Area */}
                        <div className="relative premium-panel p-4 rounded-xl bg-gray-800/50 mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-xl" id="bg-image"></div>
                            <canvas ref={canvasRef} className="relative z-10 w-full h-[250px]"></canvas>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-cyan-400 z-20">
                                {counter.toFixed(2)}x
                            </div>
                        </div>

                        {/* Bet Controls */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(e.target.value)}
                                    min="0"
                                    max="100"
                                    placeholder="Enter bet amount"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-cyan-500/50"
                                    onKeyDown={(e) => {
                                        if (['-', '+', 'e'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                <div className="absolute top-3 right-4 text-gray-400">€</div>
                            </div>
                            <button
                                onClick={handleBetButtonClick}
                                className={`cyber-button min-w-[120px] ${placedBet ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400' : ''}`}
                            >
                                {placedBet ? 'Cash Out' : 'Bet'}
                            </button>
                        </div>

                        {/* Message */}
                        {message && (
                            <div className="mt-4 p-3 premium-panel rounded-lg bg-cyan-500/5">
                                <p className="text-center text-gray-300">{message}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Game Info Panel */}
                <div className="space-y-6">
                    <div className="premium-panel p-6 rounded-xl">
                        <h2 className="text-xl font-medium mb-6 neon-text">How to Play</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-cyan-400 font-medium">1</span>
                                </div>
                                <p className="text-gray-400">Enter your bet amount in the input field</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-purple-400 font-medium">2</span>
                                </div>
                                <p className="text-gray-400">Click "Bet" to place your bet when the plane is not flying</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-pink-400 font-medium">3</span>
                                </div>
                                <p className="text-gray-400">Click "Cash Out" before the plane flies away to collect your winnings</p>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-red-400 font-medium">4</span>
                                </div>
                                <p className="text-gray-400">The longer you wait, the higher the multiplier, but don't wait too long!</p>
                            </div>
                        </div>
                    </div>

                    {/* Game Stats */}
                    <div className="premium-panel p-6 rounded-xl">
                        <h2 className="text-xl font-medium mb-6 neon-text">Game Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Players Online</p>
                                <p className="text-2xl font-medium neon-text flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-cyan-400" />
                                    247
                                </p>
                            </div>
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Highest Multiplier</p>
                                <p className="text-2xl font-medium neon-text flex items-center">
                                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                                    65.11x
                                </p>
                            </div>
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Next Round</p>
                                <p className="text-2xl font-medium neon-text flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-purple-400" />
                                    {isFlying ? 'Live' : '8s'}
                                </p>
                            </div>
                            <div className="premium-panel p-4 rounded-lg">
                                <p className="text-sm text-gray-400 mb-1">Total Bets</p>
                                <p className="text-2xl font-medium neon-text flex items-center">
                                    <History className="w-5 h-5 mr-2 text-cyan-400" />
                                    1.2K
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Game Rules */}
                    <div className="premium-panel p-6 rounded-xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertCircle className="w-5 h-5 text-cyan-400" />
                            <h2 className="text-lg font-medium">Game Rules</h2>
                        </div>
                        <div className="space-y-4 text-sm text-gray-400">
                            <p>
                                Aviator is a multiplayer game featuring an increasing curve that can crash at any moment.
                            </p>
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Place your bet before the round starts</li>
                                <li>Watch the multiplier increase from 1.00x</li>
                                <li>Cash out before the plane flies away to win</li>
                                <li>If you don't cash out before the crash, you lose your bet</li>
                                <li>The multiplier at which you cash out is your winning multiplier</li>
                            </ul>
                            <div className="premium-panel p-3 rounded-lg bg-cyan-500/5">
                                <div className="flex items-start space-x-2">
                                    <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <p>
                                        Remember: The longer you wait, the higher the potential reward, but also the higher the risk of losing your bet!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AppFooter />
        </>
    );
};

export default AviatorGame;