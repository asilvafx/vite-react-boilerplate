import React from 'react';
import {Wallet} from 'lucide-react';
import { useUser } from '../context/UserProvider';
import TokenBalanceSection from "../components/TokenBalanceSection";

const UserStats = () => {

    return (
        <section className="mb-10 w-full max-w-screen-lg mx-auto">

            {/* Wallet Info */}
            <div className="premium-panel p-4 md:p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Wallet className="w-6 h-6 premium-icon"/>
                    </div>
                    <h3 className="text-xl font-medium">My Assets</h3>
                </div>
                <div className="space-y-4">
                    <TokenBalanceSection/>
                </div>
            </div>
        </section>
    );
};

export default UserStats;