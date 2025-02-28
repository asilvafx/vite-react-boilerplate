import React from 'react';
import {ArrowRightLeft, Box, HandCoins, Send, SendToBack, Users, Wallet} from 'lucide-react';
import TokenBalanceSection from "../components/TokenBalanceSection";
import {Link} from "react-router-dom";

const UserStats = () => {

    const actionLinks = [
        {
            path: "/receive",
            icon: <HandCoins className="w-5 h-5 text-emerald-400" />,
            title: "Receive"
        },
        {
            path: "/exchange",
            icon: <SendToBack className="w-5 h-5 text-blue-400" />,
            title: "Exchange"
        },
        {
            path: "/send",
            icon: <Send className="w-5 h-5 text-purple-400" />,
            title: "Send"
        },
    ];

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
                <div className="space-y-4 mb-6">
                    <TokenBalanceSection/>
                </div>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {actionLinks.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            className="cyber-button"
                        >
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col gap-2 items-center justify-center text-center p-1">
                                    <div>
                                        {action.icon}
                                    </div>
                                    <div>
                                        <p className="!font-semibold neon-text group-hover:text-cyan-400 transition-colors">{action.title}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserStats;