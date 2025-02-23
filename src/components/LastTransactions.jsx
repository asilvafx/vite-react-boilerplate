import React from 'react';
import {Link} from "react-router-dom";
import {Gift, ArrowRightLeft, ArrowRight, Send} from 'lucide-react';
import {useUser} from '../context/UserProvider';
import { getRecentTransactions } from '../lib/transactions';
const LastTransactions = () => {

    const {userData} = useUser();
    const recentTransactions = getRecentTransactions();

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'send':
                return <Send className="w-5 h-5 text-red-400" />;
            case 'receive':
                return <ArrowRight className="w-5 h-5 text-green-400" />;
            case 'exchange':
                return <ArrowRightLeft className="w-5 h-5 text-blue-400" />;
            case 'chest_join':
                return <Gift className="w-5 h-5 text-purple-400" />;
            case 'chest_win':
                return <Gift className="w-5 h-5 text-yellow-400" />;
            default:
                return <ArrowRight className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <section className="w-full max-w-screen-lg mx-auto premium-panel p-4 md:p-6 rounded-xl mb-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <ArrowRightLeft className="w-6 h-6 premium-icon" />
                    </div>
                    <h2 className="text-xl font-medium">Recent Transactions</h2>
                </div>
                <Link to="/transactions" className="hidden md:flex cyber-button items-center space-x-2">
                    <span>Transaction</span>
                    <ArrowRight className="w-4 h-4"/>
                </Link>
            </div>

            <div className="space-y-4">
                {recentTransactions.map(tx => (
                    <div key={tx.id} className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-gray-800 rounded-lg">
                                    {getTransactionIcon(tx.type)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-200">{tx.description}</p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(tx.timestamp).toLocaleDateString()} at {new Date(tx.timestamp).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-medium ${
                                    tx.type === 'receive' || tx.type === 'chest_win' ? 'text-green-400' :
                                        tx.type === 'send' ? 'text-red-400' : 'text-gray-300'
                                }`}>
                                    {tx.type === 'send' ? '-' : tx.type === 'receive' || tx.type === 'chest_win' ? '+' : ''}{tx.amount} {tx.token}
                                </p>
                                <p className={`text-sm ${
                                    tx.status === 'completed' ? 'text-green-400' :
                                        tx.status === 'pending' ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Link to="/transactions" className="mt-6 w-full cyber-button flex md:hidden items-center justify-between space-x-2">
                <span>Transactions</span>
                <ArrowRight className="w-4 h-4"/>
            </Link>
        </section>
    )
}

export default LastTransactions;
