import React from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../context/UserProvider';
import {Copy, User, ArrowRight} from 'lucide-react';
import {RiVerifiedBadgeFill} from "react-icons/ri";
import { shortenAddress } from '../lib/utils';
import copyToClipboard from "./CopyToClipboard";

const ProfileInfo = () => {

    const {userData} = useUser();

    return (
    <section className="w-full max-w-screen-lg mx-auto mb-10">
        <div className="premium-panel p-4 md:p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
                <User className="w-6 h-6 premium-icon" />
            </div>
            <h2 className="text-xl font-medium">Profile Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-panel p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Email Address</p>
                <p className="font-medium text-gray-200">{userData?.email}</p>
            </div>
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
        </div>

        <div className="mt-6 flex w-full">
            <Link to="/account"
                className="cyber-button w-full flex items-center justify-between gap-2"
            >
                Manage Account
                <ArrowRight className="w-4 h-4"/>
            </Link>
        </div>
        </div>
    </section>
    )
}

export default ProfileInfo;