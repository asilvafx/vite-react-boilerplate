import React from 'react';
import { Globe } from "lucide-react";
import IDKit from './IDKit';

const WorldIDVerification = ({ isVerified = true }) => {
    return (
        !isVerified && (
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
                        Verify your humanity using WorldID and receive <span className="text-cyan-400 font-medium">50 TOKENS</span> as a reward.
                        This helps us maintain a fair and bot-free environment.
                    </p>
                    <IDKit/>
                </div>
            </div>
        )
    );
};

export default WorldIDVerification;