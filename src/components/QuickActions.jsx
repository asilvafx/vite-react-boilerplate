import React from 'react';
import { Link } from "react-router-dom";
import { Gauge, HandCoins, SendToBack, Send } from "lucide-react";

const QuickActions = () => {
    return (
        <div className="premium-panel p-6 rounded-xl space-y-6 mb-10">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Gauge className="w-5 h-5 text-emerald-400"/>
                </div>
                <h3 className="text-lg font-medium">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                <Link to="/receive" className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group">
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
                <Link to="/exchange" className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group">
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
                <Link to="/send" className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Send className="w-5 h-5 text-purple-400"/>
                            </div>
                            <div>
                                <p className="font-medium group-hover:text-cyan-400 transition-colors">Send</p>
                                <p className="text-sm text-gray-400 truncate">Transfer tokens to another wallet</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default QuickActions;