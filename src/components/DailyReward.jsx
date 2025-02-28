import React, { useState, useEffect } from 'react';
import { Trophy } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUser  } from "../context/UserProvider";
import DbService from "../data/db.service";
import { loadConfig, loadEnv } from "../lib/site";
import { sendTransaction } from "../lib/web3";
import {getUserData, updateData} from "../lib/user";

const DailyReward = () => {
    const { userData } = useUser ();
    const [timeUntilNextReward, setTimeUntilNextReward] = useState('');
    const [canClaimReward, setCanClaimReward] = useState(false);
    const [loading, setLoading] = useState(false);

    const TOKENS_REWARD = 10;

    useEffect(() => {
        const checkRewardStatus = () => {
            const lastClaimTime = userData?.last_reward ? new Date(userData.last_reward) : null;
            const now = new Date();

            if (!lastClaimTime) {
                setCanClaimReward(true);
                return;
            }

            const nextClaimTime = new Date(lastClaimTime.getTime() + 24 * 60 * 60 * 1000);
            if (now >= nextClaimTime) {
                setCanClaimReward(true);
            } else {
                setCanClaimReward(false);
                setLoading(false);
                updateCountdown(nextClaimTime);
            }
        };

        checkRewardStatus();
        const interval = setInterval(checkRewardStatus, 1000);
        return () => clearInterval(interval);
    }, [userData]);

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
        setLoading(true);
        const now = new Date();
        try {
            // Validate user data before proceeding
            if (!userData || !userData.web3_address || !userData.email) {
                toast.error("User  data is invalid. Please log in again.");
                setLoading(false);
                return;
            }
            const storedData = await getUserData();

            const lastClaimTime = storedData?.last_reward ? new Date(storedData.last_reward) : null;
            const now = new Date();

            let isValid = false;
            if(!lastClaimTime){
                isValid = true;
            } else {
                const nextClaimTime = new Date(lastClaimTime.getTime() + 24 * 60 * 60 * 1000);
                if (now >= nextClaimTime) {
                    isValid = true;
                }
            }

            if(isValid) {
                // Send the transaction to claim the reward
                const tx = await sendTransaction(TOKENS_REWARD, userData.web3_address, loadEnv.WEB3_MASTER_ADDRESS, loadEnv.WEB3_MASTER_PK);
                if (typeof (tx.txhash) !== "undefined" && tx.txhash !== null) {
                    const userKey = await DbService.getItemKey('email', userData.email, 'users');
                    await DbService.update(userKey, {last_reward: now.toISOString()}, 'users');
                    await updateData();

                    // Set canClaimReward to false immediately after claiming
                    setCanClaimReward(false);
                    toast.success(`Claimed ${TOKENS_REWARD} $${loadConfig.WEB3_CONTRACT_SYMBOL}`);

                    // Start the countdown for the next claim
                    const nextClaimTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    updateCountdown(nextClaimTime);
                } else {
                    toast.error("Transaction failed. Please try again later.");
                    setLoading(false);
                }
            } else {
                toast.error("Transaction failed. Please try again later.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error claiming reward:", error);
            toast.error("Failed to claim reward. Please try again.");
            setLoading(false);
        }
    };

    return (
        <section className="w-full max-w-screen-lg mx-auto mb-10">
            <div className="premium-panel p-4 md:p-6 rounded-xl relative overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-neutral-500/10 via-blue-800/10 to-cyan-500/10 rounded-full blur-3xl"/>

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
                                className="text-purple-400 font-medium">{TOKENS_REWARD} ${loadConfig.WEB3_CONTRACT_SYMBOL}</span>
                            </p>
                        </div>
                        <button
                            onClick={handleClaimReward}
                            disabled={!canClaimReward || loading}
                            className={`cyber-button flex items-center space-x-2 group ${(!canClaimReward || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"/>
                            <span>{loading ? 'Processing...' : (canClaimReward ? 'Claim Reward' : timeUntilNextReward)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DailyReward;