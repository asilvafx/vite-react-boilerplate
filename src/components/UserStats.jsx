import React from 'react';
import {Copy} from 'lucide-react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useUser } from '../context/UserProvider';
import { shortenAddress } from '../lib/utils';
import copyToClipboard from "./CopyToClipboard";
import TokenBalanceSection from "../components/TokenBalanceSection";

const UserStats = () => {
    const { userData } = useUser ();

    return (
        <section className="my-10 w-full max-w-screen-lg mx-auto">

            {/* Wallet Info */}
            <div className="premium-panel p-4 md:p-6 rounded-xl">
                <h1 className="text-3xl font-bold neon-text mb-8">My Wallet</h1>
                <div className="space-y-4">
                    <div className="premium-panel p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400">Wallet Address</span>
                            <button
                                onClick={() => copyToClipboard(userData?.web3_address, 'Wallet address copied to clipboard')}
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
                    <TokenBalanceSection/>
                </div>
            </div>
        </section>
    );
};

export default UserStats;