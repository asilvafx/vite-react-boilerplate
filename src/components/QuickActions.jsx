import React from 'react';
import { Link } from "react-router-dom";
import { Gauge, HandCoins, SendToBack, Send, Box, ArrowRightLeft, Users } from "lucide-react";

// Define the action links as a JSON array
const actionLinks = [
    {
        path: "/receive",
        icon: <HandCoins className="w-5 h-5 text-emerald-400" />,
        title: "Receive",
        description: "Receive BOLT tokens",
        bgColor: "bg-emerald-500/10"
    },
    {
        path: "/exchange",
        icon: <SendToBack className="w-5 h-5 text-blue-400" />,
        title: "Exchange",
        description: "Swap between POL and BOLT",
        bgColor: "bg-blue-500/10"
    },
    {
        path: "/send",
        icon: <Send className="w-5 h-5 text-purple-400" />,
        title: "Send",
        description: "Transfer tokens to another wallet",
        bgColor: "bg-purple-500/10"
    },
    {
        path: "/transactions",
        icon: <ArrowRightLeft className="w-5 h-5 text-emerald-400" />,
        title: "Transactions",
        description: "View your last movements",
        bgColor: "bg-emerald-500/10"
    },
    {
        path: "/contacts",
        icon: <Users className="w-5 h-5 text-emerald-400" />,
        title: "Contacts",
        description: "Access your contact list",
        bgColor: "bg-emerald-500/10"
    },
    {
        path: "/chests",
        icon: <Box className="w-5 h-5 text-emerald-400" />,
        title: "Chests",
        description: "Create, join & earn!",
        bgColor: "bg-emerald-500/10"
    },
];

const QuickActions = () => {
    return (
        <section className="mb-10 w-full max-w-screen-lg mx-auto">
            <div className="premium-panel p-4 md:p-6 rounded-xl space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Gauge className="w-6 h-6 premium-icon" />
                    </div>
                    <h3 className="text-xl font-medium">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {actionLinks.map((action, index) => (
                        <Link
                            key={index}
                            to={action.path}
                            className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 ${action.bgColor} rounded-lg`}>
                                        {action.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium group-hover:text-cyan-400 transition-colors">{action.title}</p>
                                        <p className="text-sm text-gray-400 truncate">{action.description}</p>
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

export default QuickActions;