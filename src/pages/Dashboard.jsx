import React, { useState, useEffect } from 'react';
import { Globe, Gauge, Trophy, Copy, SendToBack, Send, HandCoins, User } from "lucide-react";
import {RiVerifiedBadgeFill} from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Label } from 'flowbite-react';
import { useUser } from '../context/UserProvider';
import { shortenAddress } from '../lib/utils';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import TokenBalanceSection from "../components/TokenBalanceSection";
import IDKit from '../components/IDKit';
import ContactList from '../components/ContactList';

const Dashboard = () => {

    const { userData } = useUser();

    const [activeTab, setActiveTab] = useState('profile');

    const [isVerified, setIsVerified] = useState(false);
    const [timeUntilNextReward, setTimeUntilNextReward] = useState('');
    const [canClaimReward, setCanClaimReward] = useState(false);

    const [profileData, setProfileData] = useState({
        username: userData?.displayName,
        email: userData?.email,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {

        // In a real app, fetch the last claim time from your database
        const checkRewardStatus = async () => {
            // Mock API call - replace with actual database check
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
        // In a real app, send this to your backend
        const now = new Date();
        localStorage.setItem('lastRewardClaim', now.toISOString());
        setCanClaimReward(false);

        // Mock reward amount - replace with actual reward logic
        const rewardAmount = 50;
        console.log(`Claimed ${rewardAmount} BOLT tokens`);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Wallet address copied to clipboard', {
            icon: <Copy className="w-4 h-4 text-emerald-400" />,
            duration: 2000,
        });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log('Update profile:', profileData);
        toast.success('Profile updated successfully');
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        console.log('Update password:', passwordData);
        toast.success('Password updated successfully');
    };

    const handleEmailUpdate = (e) => {
        e.preventDefault();
        console.log('Update email:', profileData.email);
        toast.success('Email updated successfully');
    };

    return (
        <>
            <Header/>
            {/* User Stats Section */}
            <section className="my-10 w-full max-w-screen-lg mx-auto">

                <div className="grid grid-cols-1 gap-8 mb-10">

                    {/* WorldID Verification Banner */}
                    {!isVerified && (
                        <div className="premium-panel p-6 rounded-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"/>
                            <div className="relative z-10">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                                        <Globe className="w-6 h-6 premium-icon"/>
                                    </div>
                                    <h2 className="text-xl font-medium">Verify Your Humanity</h2>
                                </div>

                                <p className="text-gray-400 mb-6 max-w-2xl">
                                    Verify your humanity using WorldID and receive <span
                                    className="text-cyan-400 font-medium">50 TOKENS</span> as a reward.
                                    This helps us maintain a fair and bot-free environment.
                                </p>

                                <IDKit/>

                            </div>
                        </div>
                    )}

                    {/* Wallet Info */}
                    <div className="premium-panel p-6 rounded-xl">

                        <h1 className="text-3xl font-bold neon-text mb-8">My Wallet</h1>
                        <div className="space-y-4">
                            <div className="premium-panel p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400">Wallet Address</span>
                                    <button
                                        onClick={() => copyToClipboard(userData?.web3_address)}
                                        className="text-cyan-400 hover:text-cyan-300 p-1 transition-colors"
                                    >
                                        <Copy className="w-4 h-4"/>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-300 font-mono">{shortenAddress(userData?.web3_address)} </p>

                                    {userData?.is_verified ? (
                                        <RiVerifiedBadgeFill className="fill-blue-500"/>
                                    ) : (
                                        <RiVerifiedBadgeFill className="fill-gray-600"/>
                                    )}

                                </div>
                            </div>

                            {/* Token Balances */}
                            <TokenBalanceSection/>

                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="premium-panel p-6 rounded-xl space-y-6 mb-10">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Gauge className="w-5 h-5 text-emerald-400"/>
                        </div>
                        <h3 className="text-lg font-medium">Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                        <Link
                            to="/receive"
                            className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                        <HandCoins className="w-5 h-5 text-emerald-400"/>
                                    </div>
                                    <div>
                                        <p className="font-medium group-hover:text-cyan-400 transition-colors">Receive</p>
                                        <p className="text-sm text-gray-400 truncate">Receive BOLT tokens</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/exchange"
                            className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <SendToBack className="w-5 h-5 text-blue-400"/>
                                    </div>
                                    <div>
                                        <p className="font-medium group-hover:text-cyan-400 transition-colors">Exchange</p>
                                        <p className="text-sm text-gray-400 truncate">Swap between POL and BOLT</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/send"
                            className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-500/10 rounded-lg">
                                        <Send className="w-5 h-5 text-purple-400"/>
                                    </div>
                                    <div>
                                        <p className="font-medium group-hover:text-cyan-400 transition-colors">Send</p>
                                        <p className="text-sm text-gray-400 truncate">Transfer tokens to another
                                            wallet</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>

                {/* Daily Reward Section */}
                <div className="premium-panel p-6 rounded-xl mb-8 relative overflow-hidden">
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
                                    Claim your daily reward of <span className="text-purple-400 font-medium">50 BOLT tokens</span>
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

            {/* Manage Account Section */}

            <section className="w-full max-w-screen-lg mx-auto mb-10">
                <div className="w-100 premium-panel p-6 rounded-xl mb-10">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <User className="w-6 h-6 premium-icon"/>
                        </div>
                        <h2 className="text-xl font-medium">Manage Account</h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'profile'
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                activeTab === 'security'
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Security
                        </button>
                    </div>

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div>
                                <Label htmlFor="username" value="Username" className="text-gray-300 mb-2"/>
                                <input
                                    className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                    id="username"
                                    type="text"
                                    value={profileData.username}
                                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                                    required
                                />
                            </div>

                            <button type="submit" className="cyber-button w-full">
                                Update Profile
                            </button>
                        </form>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            {/* Email Update Form */}
                            <div className="premium-panel p-6 rounded-lg bg-cyan-500/5">
                                <h3 className="text-lg font-medium mb-4">Change Email</h3>
                                <form onSubmit={handleEmailUpdate} className="space-y-4">
                                    <div>
                                        <Label htmlFor="email" value="Email" className="text-gray-300 mb-2"/>
                                        <input
                                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="cyber-button w-full">
                                        Update Email
                                    </button>
                                </form>
                            </div>

                            {/* Password Update Form */}
                            <div className="premium-panel p-6 rounded-lg bg-cyan-500/5">
                                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <div>
                                        <Label htmlFor="currentPassword" value="Current Password"
                                               className="text-gray-300 mb-2"/>
                                        <input
                                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                            id="currentPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({
                                                ...passwordData,
                                                currentPassword: e.target.value
                                            })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="newPassword" value="New Password"
                                               className="text-gray-300 mb-2"/>
                                        <input
                                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                            id="newPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({
                                                ...passwordData,
                                                newPassword: e.target.value
                                            })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="confirmPassword" value="Confirm New Password"
                                               className="text-gray-300 mb-2"/>
                                        <input
                                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({
                                                ...passwordData,
                                                confirmPassword: e.target.value
                                            })}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="cyber-button w-full">
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact List Section */}
            <section className="w-full max-w-screen-lg mx-auto mb-10">
                <ContactList
                    contacts={[
                        {id: '1', name: 'Alice', address: '0x1234567890abcdef1234567890abcdef12345678'},
                        {id: '2', name: 'Bob', address: '0xabcdef1234567890abcdef1234567890abcdef12'},
                        {id: '3', name: 'Charlie', address: '0x7890abcdef1234567890abcdef1234567890abcd'},
                    ]}
                />
            </section>


                <AppFooter/>
            </>
            );
            }

            export default Dashboard;