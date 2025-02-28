import React from 'react';
import {Link} from "react-router-dom";
import {toast} from 'react-hot-toast';
import {Copy, Share2, Gift, Users, History } from 'lucide-react';

const ReferralSection = () => {

    const referralCode = "X0XXXY1";

    const copyReferralCode = () => {
        navigator.clipboard.writeText(referralCode).then(r =>
            toast.success('Referral code copied to clipboard!', {
                icon: <Copy className="w-4 h-4 text-emerald-400" />,
                duration: 2000,
            })
        );
    };

    const shareReferral = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join CyberChest',
                    text: `Join CyberChest using my referral code: ${referralCode} and get 50 BOLT tokens!`,
                    url: window.location.origin
                });
            } catch (error) {
                copyReferralCode();
            }
        } else {
            copyReferralCode();
        }
    };

    return (
        <section className="w-full max-w-screen-lg mx-auto mb-10">
            <div className="premium-panel p-4 md:p-8 rounded-xl relative overflow-hidden">

                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"/>
                <div
                    className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"/>

                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
                            <Users className="w-6 h-6 text-cyan-400"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium">Refer Friends, Earn Rewards</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-gray-400">
                                    You get 50 BOLT tokens for each friend who joins and makes their first deposit.
                                    Your friends also get 50 BOLT tokens when they sign up using your code!
                                </p>
                            </div>

                            <div
                                className="premium-panel p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                                <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
                                <div className="flex items-center space-x-3">
                                    <code
                                        className="flex-1 font-mono text-2xl font-medium text-cyan-400 tracking-wider">
                                        {referralCode}
                                    </code>
                                    <button
                                        onClick={copyReferralCode}
                                        className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                                    >
                                        <Copy className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={shareReferral}
                                    className="cyber-button w-full flex items-center justify-center space-x-2"
                                >
                                    <Share2 className="w-5 h-5"/>
                                    <span>Share with Friends</span>
                                </button>
                                <Link
                                    to="/invites"
                                    className="cyber-button bg-neutral-800 flex-1 flex items-center justify-center space-x-2"
                                >
                                    <History className="w-5 h-5"/>
                                    <span>Previous Invites</span>
                                </Link>
                            </div>

                        </div>

                        <div
                            className="premium-panel p-6 rounded-xl bg-gradient-to-br from-neutral-500/5 to-neutral-800/9">
                            <h3 className="text-lg font-medium mb-4">How It Works</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div
                                        className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-cyan-400 font-medium">1</span>
                                    </div>
                                    <p className="text-gray-400">Share your unique referral code with friends</p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div
                                        className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-purple-400 font-medium">2</span>
                                    </div>
                                    <p className="text-gray-400">Friends sign up using your referral code</p>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div
                                        className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                                        <span className="text-pink-400 font-medium">3</span>
                                    </div>
                                    <p className="text-gray-400">Both you and your friend receive 50 BOLT tokens
                                        each</p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-amber-500/5">
                                <div className="flex items-center space-x-3">
                                    <Gift className="w-5 h-5 text-yellow-400"/>
                                    <p className="text-sm text-gray-300">
                                        You've earned <span className="text-yellow-400 font-medium">250 BOLT</span> from
                                        5
                                        referrals so far!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReferralSection;