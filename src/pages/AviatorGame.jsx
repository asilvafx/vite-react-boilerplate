import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AlertCircle, Trophy, Wallet, Flame, Zap, BarChart3, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SectionTitle from '../components/SectionTitle';
import { useUser  } from '../context/UserProvider';
import aviator_img from '../assets/aviator.png';

const FIXED_BET_AMOUNT = 10; // Fixed bet amount
const FEE_PERCENTAGE = 0.1; // 10% fee
const COUNTER_INCREMENT = 0.0015; // Increased from 0.005 to make the counter faster

const AviatorGame = () => {
    const { userData } = useUser ();
    const canvasRef = useRef(null);
    const [counter, setCounter] = useState(1.0);
    const [isFlying, setIsFlying] = useState(false);
    const [placedBet, setPlacedBet] = useState(false);
    const [cashedOut, setCashedOut] = useState(false);
    const [balance, setBalance] = useState(userData?.balance || 3000);
    const [message, setMessage] = useState('Wait for the next round');
    const [counterDepo, setCounterDepo] = useState([]);
    const [randomStop, setRandomStop] = useState(0);
    const animationIdRef = useRef(0);
    const dotPathRef = useRef([]);
    const imageRef = useRef(null);
    const hasInitializedRef = useRef(false);
    const balanceRef = useRef(userData?.balance || 3000);
    const counterRef = useRef(1.0);
    const updateUserBalanceRef = useRef(false);

    // Keep the ref in sync with state
    useEffect(() => {
        balanceRef.current = balance;
    }, [balance]);

    // Keep counter ref in sync with state
    useEffect(() => {
        counterRef.current = counter;
    }, [counter]);

    // Update user balance when local balance changes - but only when the flag is set
    useEffect(() => {
        if (updateUserBalanceRef.current && userData) {
            updateUserBalanceRef.current = false;
        }
    }, [balance, userData]);

    // Initialize the game canvas once
    useEffect(() => {
        if (hasInitializedRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = 800;
        canvas.height = 250;

        // Preload the airplane image
        const image = new Image();
        image.src = aviator_img;
        image.onload = () => {
            imageRef.current = image;
        };

        hasInitializedRef.current = true;

        // Clean up on unmount
        return () => {
            cancelAnimationFrame(animationIdRef.current);
        };
    }, []);

    // Start animation when bet is placed
    useEffect(() => {
        if (!placedBet || !canvasRef.current || !imageRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Start drawing with the preloaded image
        draw(ctx, imageRef.current, canvas);

        return () => {
            cancelAnimationFrame(animationIdRef.current);
        };
    }, [placedBet]);

    // Draw function for animation
    const draw = useCallback((ctx, image, canvas) => {
        let speedX = 5; // Speed for the plane's horizontal movement
        let speedY = 2; // Speed for the plane's vertical movement
        let x = 0;
        let y = canvas.height;
        let localCounter = 1.0;

        // Reset dot path
        dotPathRef.current = [];

        const animate = () => {
            // Update counter locally first to avoid state updates in animation loop
            localCounter += COUNTER_INCREMENT;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            x += speedX;

            if (localCounter < randomStop) {
                y -= speedY;
                y = canvas.height / 2 + 50 * Math.cos(x / 100);

                // Update React state for counter
                setCounter(localCounter);
                setIsFlying(true);
            } else {
                // Stop the animation when the counter reaches the random stop
                cancelAnimationFrame(animationIdRef.current);
                setCounter(localCounter);
                setPlacedBet(false);
                setIsFlying(false);
                setMessage('You lost! Click "Bet" to start a new round.');
                setCounterDepo(prev => [localCounter.toFixed(2), ...prev.slice(0, 25)]);

                return; // Stop the animation loop
            }

            dotPathRef.current.push({ x, y });
            const canvasOffsetX = canvas.width / 2 - x;
            const canvasOffsetY = canvas.height / 2 - y;

            ctx.save();
            ctx.translate(canvasOffsetX, canvasOffsetY);

            // Draw grid lines for a gaming effect
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.lineWidth = 1;

            // Horizontal grid lines
            for (let i = 0; i < canvas.height; i += 20) {
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
            }

            // Vertical grid lines
            for (let i = 0; i < canvas.width; i += 20) {
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
            }

            ctx.stroke();

            // Draw trail with gradient
            if (dotPathRef.current.length > 1) {
                for (let i = 1; i < dotPathRef.current.length; i++) {
                    const gradient = ctx.createLinearGradient(
                        dotPathRef.current[i - 1].x, dotPathRef.current[i - 1].y,
                        dotPathRef.current[i].x, dotPathRef.current[i].y
                    );
                    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.7)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.7)');

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 3;
                    ctx.moveTo(dotPathRef.current[i - 1].x, dotPathRef.current[i - 1].y);
                    ctx.lineTo(dotPathRef.current[i].x, dotPathRef.current[i].y);
                    ctx.stroke();
                }
            }

            // Draw glow effect
            ctx.beginPath();
            const glowRadius = 10;
            const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
            glow.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
            glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
            ctx.fillStyle = glow;
            ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            ctx.fill();

            // Draw the plane
            ctx.drawImage(image, x - 28, y - 78, 185, 85);
            ctx.restore();
            animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);
    }, [randomStop]);

    // Function to generate a random stop value with weighted chances based on risk levels
    const generateRandomStop = useCallback(() => {
        const randomValue = Math.random();
        let multiplier;

        // Define weighted chances for each risk level
        if (randomValue < 0.5) {
            // Low Risk: 1.00x - 2.00x
            multiplier = Math.random() * 1 + 1; // 1.00x to 2.00x
        } else if (randomValue < 0.8) {
            // Medium Risk: 2.00x - 5.00x
            multiplier = Math.random() * 3 + 2; // 2.00x to 5.00x
        } else if (randomValue < 0.95) {
            // High Risk: 5.00x - 10.00x
            multiplier = Math.random() * 5 + 5; // 5.00x to 10.00x
        } else {
            // Extreme Risk: 10.00x+
            multiplier = Math.random() * 10 + 10; // 10.00x to 20.00x
        }

        return multiplier;
    }, []);

    // Handle bet button click
    const handleBetButtonClick = useCallback(() => {
        if (placedBet) {
            cashOut();
        } else {
            placeBet();
        }
    }, [placedBet]);

    // Place bet function
    const placeBet = useCallback(() => {
        if (placedBet || isFlying || balanceRef.current < FIXED_BET_AMOUNT) {
            setMessage('Wait for the next round or insufficient balance');
            return;
        }

        // Deduct the credits from the balance
        const newBalance = balanceRef.current - FIXED_BET_AMOUNT;

        setBalance(newBalance);
        setCounter(1.0); // Reset counter when placing a new bet
        setPlacedBet(true);
        setMessage('Placed Bet');

        // Start the game animation
        setRandomStop(generateRandomStop());
    }, [placedBet, isFlying, generateRandomStop]);

    // Cash out function
    const cashOut = useCallback(() => {
        if (cashedOut) {
            setMessage('Wait for the next round');
            return;
        }

        // Stop the animation
        cancelAnimationFrame(animationIdRef.current);
        setCashedOut(true);
        setPlacedBet(false);
        setIsFlying(false);

        // Calculate winnings based on current counter value
        const winnings = (FIXED_BET_AMOUNT - (FIXED_BET_AMOUNT * FEE_PERCENTAGE)) * counterRef.current;
        const newBalance = balanceRef.current + winnings;

        setBalance(newBalance);
        updateUserBalanceRef.current = true; // Set flag to update user balance

        setMessage(`You cashed out: ${winnings.toFixed(2)} tokens!`);
        toast.success(`You cashed out ${winnings.toFixed(2)} tokens!`, {
            icon: '🚀',
            duration: 3000,
        });

        // Reset for the next game
        resetGame();
    }, [cashedOut]);

    // Reset game state for the next round
    const resetGame = useCallback(() => {
        setCounter(1.0);
        setCashedOut(false);
        setPlacedBet(false);
        setMessage('Wait for the next round');
        setRandomStop(0);
        dotPathRef.current = [];
    }, []);

    // Get class name for counter based on value
    const getCounterClassName = useCallback((value) => {
        if (value < 2.00) return 'gaming-badge bg-blue-500/30 text-blue-300';
        if (value >= 2 && value < 5) return 'gaming-badge bg-purple-500/30 text-purple-300';
        if (value >= 5 && value < 10) return 'gaming-badge bg-pink-500/30 text-pink-300';
        return 'gaming-badge bg-red-500/30 text-red-300';
    }, []);

    // Get multiplier text color based on value
    const getMultiplierColor = useCallback((value) => {
        if (value < 2.00) return 'text-blue-400';
        if (value >= 2 && value < 5) return 'text-purple-400';
        if (value >= 5 && value < 10) return 'text-pink-400';
        return 'text-red-400';
    }, []);

    return (
        <>
            <section className="w-full max-w-screen-lg mx-auto px-4 mb-10 pt-6">
                <AppHeader backUrl="/" /> 

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="w-full">
                            <div className="premium-panel p-6 relative rounded-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg">
                                            <Zap className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <h1 className="text-2xl font-bold neon-purple-text">Aviator Game</h1>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2 gaming-stat">
                                            <Wallet className="w-4 h-4 text-purple-400" />
                                            <span className="font-bold text-purple-300">{balance.toFixed(2)} €</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Previous Multipliers */}
                                <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
                                    {counterDepo.map((value, index) => (
                                        <div
                                            key={index}
                                            className={getCounterClassName(parseFloat(value))}
                                        >
                                            {value}x
                                        </div>
                                    ))}
                                </div>

                                {/* Game Area */}
                                <div className="relative gaming-panel p-4 bg-gray-900/80 mb-6 h-[280px]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-xl gaming-grid-overlay"></div>
                                    <canvas ref={canvasRef} className="relative w-full h-full"></canvas>
                                    <div className={`gaming-multiplier-display ${getMultiplierColor(counter)}`}>
                                        {counter.toFixed(2)}x
                                    </div>
                                </div>

                                {/* Bet Controls */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            value={FIXED_BET_AMOUNT}
                                            readOnly
                                            className="w-full bg-gray-800/80 border border-purple-700/30 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-purple-500/50"
                                        />
                                        <div className="absolute top-3 right-4 text-purple-400">€</div>
                                    </div>
                                    <button
                                        onClick={handleBetButtonClick}
                                        className={`cyber-button min-w-[120px] ${
                                            placedBet
                                                ? 'bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/80 hover:to-emerald-500/80 border-green-500/50'
                                                : ''
                                        }`}
                                    >
                                        {placedBet ? 'Cash Out' : 'Bet'}
                                    </button>
                                </div>

                                {/* Message */}
                                {message && (
                                    <div className="mt-4 p-3 rounded-lg bg-purple-500/5">
                                        <p className="text-center text-gray-300 relative">{message}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stats Panel */}
                        <div className="premium-panel p-6">
                            <h3 className="text-xl font-bold mb-4 neon-blue-text flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2" />
                                Game Stats
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="gaming-panel p-4 text-center">
                                    <div className="text-sm text-gray-400 mb-1">Highest Win</div>
                                    <div className="text-xl font-bold text-blue-400">
                                        {Math.max(...counterDepo.map(v => parseFloat(v) || 0), 0).toFixed(2)}x
                                    </div>
                                </div>
                                <div className="gaming-panel p-4 text-center">
                                    <div className="text-sm text-gray-400 mb-1">Games Played</div>
                                    <div className="text-xl font-bold text-purple-400">{counterDepo.length}</div>
                                </div>
                                <div className="gaming-panel p-4 text-center">
                                    <div className="text-sm text-gray-400 mb-1">Avg. Multiplier</div>
                                    <div className="text-xl font-bold text-pink-400">
                                        {counterDepo.length > 0
                                            ? (counterDepo.reduce((sum, val) => sum + parseFloat(val), 0) / counterDepo.length).toFixed(2)
                                            : '0.00'}x
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Game Info Panel */}
                    <div className="space-y-6">
                        <div className="premium-panel rounded-xl p-4 md:p-6">
                            <h2 className="text-xl font-bold mb-6 neon-purple-text flex items-center">
                                <Flame className="w-5 h-5 mr-2 text-purple-400" />
                                How to Play
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                                        <span className="text-blue-400 font-bold">1</span>
                                    </div>
                                    <p className="text-gray-300">Fixed bet amount of 10 tokens</p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                                        <span className="text-purple-400 font-bold">2</span>
                                    </div>
                                    <p className="text-gray-300">Click "Bet" to place your bet when the plane is not flying</p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 border border-pink-500/30">
                                        <span className="text-pink-400 font-bold">3</span>
                                    </div>
                                    <p className="text-gray-300">Click "Cash Out" before the plane flies away to collect your winnings</p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                                        <span className="text-red-400 font-bold">4</span>
                                    </div>
                                    <p className="text-gray-300">The longer you wait, the higher the multiplier, but don't wait too long!</p>
                                </div>
                            </div>
                        </div>

                        {/* Multiplier Guide */}
                        <div className="premium-panel rounded-xl p-4 md:p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <Clock className="w-5 h-5 text-blue-400" />
                                <h2 className="text-lg font-bold neon-blue-text">Multiplier Guide</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">1.00x - 2.00x</span>
                                    <span className="gaming-badge bg-blue-500/30 text-blue-300">Low Risk</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">2.00x - 5.00x</span>
                                    <span className="gaming-badge bg-purple-500/30 text-purple-300">Medium Risk</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">5.00x - 10.00x</span>
                                    <span className="gaming-badge bg-pink-500/30 text-pink-300">High Risk</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300">10.00x+</span>
                                    <span className="gaming-badge bg-red-500/30 text-red-300">Extreme Risk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster position="top-center" />
            </section>
            <AppFooter />
        </>
    );
};

export default AviatorGame;