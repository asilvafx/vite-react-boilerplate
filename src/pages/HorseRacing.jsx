import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';

const TRACK_SIZE = 400; // pixels
const TRACK_PADDING = 60; // pixels
const TOTAL_LAPS = 2;
const TRACK_SEGMENTS = 16; // 4 sides * 4 positions each
const HORSE_SPEED = 0.1;

const plans = {
    mini: { price: 1, jackpot: 1000 },
    standard: { price: 5, jackpot: 5000 },
    premium: { price: 10, jackpot: 10000 }
};

const HorseRacing = () => {
    const [horses, setHorses] = useState([
        { id: 'horse1', name: 'Cyber Thunder', odds: 2.5, color: 'bg-blue-500', position: 0, lap: 0, angle: 0 },
        { id: 'horse2', name: 'Neon Flash', odds: 3.1, color: 'bg-pink-500', position: 0, lap: 0, angle: 0 },
        { id: 'horse3', name: 'Digital Storm', odds: 4.2, color: 'bg-emerald-500', position: 0, lap: 0, angle: 0 },
        { id: 'horse4', name: 'Quantum Racer', odds: 5.0, color: 'bg-yellow-500', position: 0, lap: 0, angle: 0 },
        { id: 'horse5', name: 'Binary Bolt', odds: 6.5, color: 'bg-red-500', position: 0, lap: 0, angle: 0 },
    ]);

    const [isRacing, setIsRacing] = useState(false);
    const [showBettingForm, setShowBettingForm] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [betOrder, setBetOrder] = useState({ first: null, second: null, third: null });
    const [countdown, setCountdown] = useState(0);
    const [finishedOrder, setFinishedOrder] = useState([]);
    const [raceHistory, setRaceHistory] = useState([]);

    const getHorsePosition = (position, angle) => {
        const radius = (TRACK_SIZE - TRACK_PADDING * 2) / 2;
        const centerX = TRACK_SIZE / 2;
        const centerY = TRACK_SIZE / 2;
        const angleInRadians = (angle - 90) * (Math.PI / 180);

        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
        };
    };

    const handleOrderSelection = (position, horseId) => {
        const newBetOrder = { ...betOrder };
        Object.keys(newBetOrder).forEach((key) => {
            if (newBetOrder[key] === horseId) {
                newBetOrder[key] = null;
            }
        });
        newBetOrder[position] = horseId;
        setBetOrder(newBetOrder);
    };

    const startRace = () => {
        if (!selectedPlan || !betOrder.first || !betOrder.second || !betOrder.third) {
            toast.error('Please select race type and predict finish order');
            return;
        }

        setShowBettingForm(false);
        setFinishedOrder([]);
        setHorses(horses.map(horse => ({
            ...horse,
            position: 0,
            lap: 0,
            angle: 0
        })));

        let count = 3;
        setCountdown(count);

        const countdownInterval = setInterval(() => {
            count--;
            setCountdown(count);

            if (count === 0) {
                clearInterval(countdownInterval);
                setIsRacing(true);
            }
        }, 1000);
    };

    useEffect(() => {
        let interval;

        if (isRacing) {
            interval = setInterval(() => {
                setHorses(currentHorses => {
                    const updatedHorses = currentHorses.map(horse => {
                        const speed = HORSE_SPEED + (Math.random() * 0.1);
                        let newPosition = horse.position + speed;
                        let newLap = horse.lap;
                        let newAngle = (newPosition % TRACK_SEGMENTS) * (360 / TRACK_SEGMENTS);

                        if (newPosition >= TRACK_SEGMENTS) {
                            newPosition = 0;
                            newLap++;
                        }

                        return {
                            ...horse,
                            position: newPosition,
                            lap: newLap,
                            angle: newAngle
                        };
                    });

                    const finishedHorses = updatedHorses.filter(h => h.lap >= TOTAL_LAPS);
                    if (finishedHorses.length === horses.length) {
                        setIsRacing(false);
                        const order = updatedHorses
                            .sort((a, b) => (b.lap * TRACK_SEGMENTS + b.position) - (a.lap * TRACK_SEGMENTS + a.position))
                            .map(h => h.id);
                        setFinishedOrder(order);

                        const isWinningBet =
                            betOrder.first === order[0] &&
                            betOrder.second === order[1] &&
                            betOrder.third === order[2];

                        if (isWinningBet) {
                            const winnings = plans[selectedPlan].jackpot;
                            toast.success(`Congratulations! You won ${winnings} BOLT tokens!`, {
                                icon: '🏆',
                                duration: 5000,
                            });
                        }

                        setRaceHistory(prev => [{
                            order,
                            winningBet: isWinningBet
                        }, ...prev.slice(0, 4)]);
                    }

                    return updatedHorses;
                });
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isRacing, betOrder, selectedPlan]);

    const handleRaceAgain = () => {
        setShowBettingForm(true);
        setFinishedOrder([]);
        setBetOrder({ first: null, second: null, third: null });
        setSelectedPlan(null);
        setHorses(horses.map(horse => ({
            ...horse,
            position: 0,
            lap: 0,
            angle: 0
        })));
    };

    return (
        <>
            <Header />
            <section className="w-full max-w-screen-lg mx-auto m-10">
                <Link to="/account" className="inline-flex items-center cyber-button mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Account
                </Link>

                <div className={`grid grid-cols-1 ${showBettingForm ? 'lg:grid-cols-3' : ''} gap-8`}>
                    {/* Race Track */}
                    {(!showBettingForm || isRacing) && (
                        <div className="max-w-screen-lg mx-auto w-full premium-panel p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-medium neon-text">Virtual Race Track</h2>
                                {countdown > 0 && (
                                    <div className="text-2xl font-bold neon-text">
                                        Race starts in {countdown}...
                                    </div>
                                )}
                            </div>

                            <div className="relative bg-gray-800/50 border border-gray-700 w-full" style={{ margin: '0 auto' }}>
                                {/* Track */}
                                <div
                                    className="relative mx-auto w-full"
                                    style={{
                                        width: TRACK_SIZE,
                                        height: TRACK_SIZE,
                                        borderRadius: '2rem'
                                    }}
                                >
                                    {/* Start/Finish Line */}
                                    <div
                                        className="absolute bg-yellow-500/30"
                                        style={{
                                            width: '4px',
                                            height: '40px',
                                            left: TRACK_SIZE / 2 - 2,
                                            top: TRACK_PADDING - 20,
                                            zIndex: 1
                                        }}
                                    />

                                    {/* Horses */}
                                    {horses.map(horse => {
                                        const { x, y } = getHorsePosition(horse.position, horse.angle);
                                        return (
                                            <div
                                                key={horse.id}
                                                className={`absolute w-4 h-4 rounded-full ${horse.color} transform -translate-x-2 -translate-y-2`}
                                                style={{
                                                    left: x,
                                                    top: y,
                                                    transition: 'all 0.1s linear'
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                                {/* Lap Counter */}
                                {horses.map((horse, key) => (
                                    <div
                                        key={key}
                                        className="absolute flex items-center text-xs text-gray-400"
                                        style={{ left: '10px', top: `${18 * (key + 1)}px` }}
                                    >
                                            <span className={`rounded-full h-4 w-4 ${horse.color}`}>
                                            </span>
                                        <span className="ml-1">{horse.name}: Lap {horse.lap + 1}/{TOTAL_LAPS}</span>
                                    </div>
                                ))}
                            </div>
                            {/* User Bets Display */}
                            <div className="premium-panel p-6 rounded-xl">
                                <h2 className="text-xl font-medium neon-text mb-6">Your Bets</h2>
                                <div className="space-y-2">
                                    <p className="text-gray-400">1st Place: {betOrder.first ? betOrder.first : 'Not selected'}</p>
                                    <p className="text-gray-400">2nd Place: {betOrder.second ? betOrder.second : 'Not selected'}</p>
                                    <p className="text-gray-400">3rd Place: {betOrder.third ? betOrder.third : 'Not selected'}</p>
                                </div>
                            </div>

                            {finishedOrder.length > 0 && (
                                <div className="premium-panel p-6 rounded-lg mt-6 bg-gradient-to-r from-yellow-500/20 to-amber-500/10">
                                    <div className="flex flex-col space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Trophy className="w-6 h-6 text-yellow-400" />
                                                <div>
                                                    <h3 className="text-lg font-medium">Race Results</h3>
                                                    <p className="text-sm text-gray-400">
                                                        {betOrder.first === finishedOrder[0] &&
                                                        betOrder.second === finishedOrder[1] &&
                                                        betOrder.third === finishedOrder[2]
                                                            ? 'Congratulations on your winning bet!'
                                                            : 'Better luck next time!'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-400 mb-1">Finish Order:</div>
                                                <div className="space-x-2">
                                                    {finishedOrder.map((horseId, index) => (
                                                        <span key={horseId} className="text-cyan-400">
                                                            #{horseId}{index < 2 ? ' →' : ''}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center pt-4 border-t border-gray-700">
                                            <button onClick={handleRaceAgain} className="w-full cyber-button flex items-center justify-center">
                                                <Zap className="w-4 h-4 mr-2" />
                                                Bet Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* Betting Panel */}
                    {showBettingForm && (
                        <div className={`${isRacing ? '' : 'lg:col-span-3'} space-y-6`}>
                            {/* Race Type Selection */}
                            <div className="premium-panel p-6 rounded-xl">
                                <h2 className="text-xl font-medium neon-text mb-6">Select Race Type</h2>
                                <div className="space-y-4">
                                    {Object.entries(plans).map(([type, plan]) => (
                                        <button
                                            key={type}
                                            onClick={() => setSelectedPlan(type)}
                                            className={`w-full premium-panel p-4 rounded-lg transition-all duration-300 ${
                                                selectedPlan === type
                                                    ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                                                    : 'hover:border-cyan-400/30'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="capitalize">{type}</span>
                                                    <p className="text-sm text-gray-400">{plan.price} BOLT</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-cyan-400">{plan.jackpot} BOLT</span>
                                                    <p className="text-xs text-gray-400">Jackpot</p>
                                            </div>
                                        </div>
                                        </button>
                                        ))}
                                </div>
                            </div>

                            {/* Order Selection */}
                            <div className="premium-panel p-6 rounded-xl">
                                <h2 className="text-xl font-medium neon-text mb-6">Predict Finish Order</h2>
                                <div className="space-y-4">
                                    {(['first', 'second', 'third']).map((position) => (
                                        <div key={position} className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-400 capitalize">
                                                {position} Place
                                            </label>
                                            <div className="grid grid-cols-5 gap-2">
                                                {horses.map(horse => (
                                                    <button
                                                        key={horse.id}
                                                        onClick={() => handleOrderSelection(position, horse.id)}
                                                        disabled={isRacing}
                                                        className={`p-2 rounded-lg text-center text-sm transition-all duration-300 ${
                                                            betOrder[position] === horse.id
                                                                ? 'bg-cyan-500/20 border border-cyan-400/50'
                                                                : 'premium-panel hover:border-cyan-400/30'
                                                        }`}
                                                    >
                                                        #{horse.id}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={startRace}
                                    disabled={isRacing || countdown > 0}
                                    className="cyber-button w-full mt-6"
                                >
                                    {isRacing ? 'Race in Progress...' : 'Start Race'}
                                </button>
                            </div>


                            {/* Race History */}
                            <div className="premium-panel p-6 rounded-xl">
                                <h2 className="text-xl font-medium neon-text mb-6">Recent Results</h2>
                                {raceHistory.length > 0 ? (
                                    <div className="space-y-4">
                                        {raceHistory.map((result, index) => (
                                            <div key={index} className={`premium-panel p-4 rounded-lg ${
                                                result.winningBet ? 'bg-green-500/10' : 'bg-gray-800/50'
                                            }`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="space-x-2">
                                                        {result.order.map((horseId, idx) => (
                                                            <span key={horseId} className="text-gray-300">
                                                                #{horseId}{idx < 2 ? ' →' : ''}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {result.winningBet && (
                                                        <Crown className="w-4 h-4 text-yellow-400" />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center">No races yet</p>
                                )}
                            </div>
                        </div>
                        )}
                </div>
            </section>
            <AppFooter />
        </>
    );
};

export default HorseRacing;