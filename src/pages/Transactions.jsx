import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, ArrowRightLeft } from 'lucide-react';
import { TextInput, Select } from 'flowbite-react';
import { getAllTransactions, searchTransactions } from '../lib/transactions';
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import SectionTitle from "../components/SectionTitle";
import { useUser  } from '../context/UserProvider';

const Transactions = () => {
    const { userData } = useUser ();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const allTransactions = getAllTransactions();

    const filteredTransactions = allTransactions.filter(tx => {
        const matchesSearch = searchTerm === '' ||
            searchTransactions(searchTerm).some(t => t.id === tx.id); // Check if the transaction ID is in the search results
        const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
        const matchesType = typeFilter === 'all' || tx.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const getTransactionIcon = (type) => {
        switch (type) {
            case 'send':
                return <ArrowLeft className="w-5 h-5 text-red-400" />;
            case 'receive':
                return <ArrowLeft className="w-5 h-5 text-green-400 transform rotate-180" />;
            case 'exchange':
                return <ArrowRightLeft className="w-5 h-5 text-blue-400" />;
            default:
                return <ArrowRightLeft className="w-5 h-5 text-gray-400" />;
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString() + ' ' +
            new Date(timestamp).toLocaleTimeString();
    };

    return (
        <>
            <AppHeader backUrl="/dashboard" />
            <SectionTitle title="Transactions" />

            <section className="w-full max-w-screen-lg mx-auto premium-panel p-4 md:p-6 rounded-xl mb-10">
                <h1 className="text-2xl font-medium neon-text mb-6">Transaction History</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <input
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                        >
                            <option value="all">All Types</option>
                            <option value="send">Send</option>
                            <option value="receive">Receive</option>
                            <option value="exchange">Exchange</option>
                            <option value="chest_join">Chest Join</option>
                            <option value="chest_win">Chest Win</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredTransactions.map((tx) => (
                        <div key={tx.id} className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gray-800 rounded-lg">
                                        {getTransactionIcon(tx.type)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-200">{tx.description}</p>
                                        <p className="text-sm text-gray-400">{formatDate(tx.timestamp)}</p>
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

                            {/* Transaction Details */}
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    {tx.from && (
                                        <div>
                                            <p className="text-gray-400">From</p>
                                            <p className="font-mono text-gray-300">{tx.from}</p>
                                        </div>
                                    )}
                                    {tx.to && (
                                        <div>
                                            <p className="text-gray-400">To</p>
                                            <p className="font-mono text-gray-300">{tx.to}</p>
                                        </div>
                                    )}
                                    {tx.txHash && (
                                        <div className="col-span-2">
                                            <p className="text-gray-400">Transaction Hash</p>
                                            <p className="font-mono text-gray-300">{tx.txHash}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <AppFooter />
        </>
    );
}

export default Transactions;