import React, { useState, useEffect } from 'react';
import { Trophy } from "lucide-react";
import { toast } from "react-hot-toast";

const DailyReward = () => {
    const [timeUntilNextReward, setTimeUntilNextReward] = useState('');
    const [canClaimReward, setCanClaimReward] = useState(false);

    useEffect(() => {
        const checkRewardStatus = async () => {
            const lastClaimTime = localStorage.getItem('lastRewardClaim');
            if (!lastClaimTime) {
                setCanClaimReward(true);
                return;
            }
            const lastClaim = new Date(lastClaimTime);
            const now = new Date();
            const nextClaimTime = new Date(lastClaim.getTime() + 24 * 60 * 60 * 1000);
            if (now >= nextClaimTime) {
                setCanClaimReward(true);
            } else {
                setCanClaimReward(false);
                updateCountdown(nextClaimTime);
            }
        };

        checkRewardStatus();
        const interval = setInterval(checkRewardStatus, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateCountdown = (nextClaimTime) => {
        const now = new Date();
        const diff = nextClaimTime.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeUntilNextReward(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    };

    const handleClaimReward = async () => {
        const now = new Date();
        localStorage.setItem('lastRewardClaim', now.toISOString());
        setCanClaimReward(false);
        const rewardAmount = 50;
        console.log(`Claimed ${rewardAmount} BOLT tokens`);
        toast.success(`Claimed ${rewardAmount} BOLT tokens`);
    };

    return (
        <section className="w-full max-w-screen-lg mx-auto mb-10">
            <div className="premium-panel p-4 md:p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"/>
                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Trophy className="w-6 h-6 text-purple-400"/>
                        </div>
                        <h2 className="text-xl font-medium">Daily Reward</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="mb-4 md:mb-0">
                            <p className="text-gray-400 mb-2">
                                Claim your daily reward of <span
                                className="text-purple-400 font-medium">50 BOLT tokens</span>
                            </p>
                        </div>
                        <button
                            onClick={handleClaimReward}
                            disabled={!canClaimReward}
                            className={`cyber-button flex items-center space-x-2 group ${!canClaimReward ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"/>
                            <span>{canClaimReward ? 'Claim Reward' : timeUntilNextReward}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        );
};

export default DailyReward;