import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Gift, ArrowRightLeft, ArrowRight, Send } from 'lucide-react';
import { useUser  } from '../context/UserProvider';
import DBService from '../data/db.service';
import {shortenAddress} from "../lib/utils";

const LastTransactions = () => {
    const { userData } = useUser ();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Fetch received transactions
                const received = await DBService.getItemsByKeyValue('address_to', userData.web3_address, 'transactions') || {};
                // Fetch sent transactions
                const sent = await DBService.getItemsByKeyValue('address_from', userData.web3_address, 'transactions') || {};

                // Convert received and sent objects to arrays
                const receivedArray = Object.values(received);
                const sentArray = Object.values(sent);

                // Combine and sort transactions
                const combinedTransactions = [...receivedArray, ...sentArray].sort((a, b) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateB - dateA; // Sort in descending order
                });

                setTransactions(combinedTransactions);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userData.web3_address]);

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

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner if desired
    }

    return (
        <section className="w-full max-w-screen-lg mx-auto mb-10">
            <div className="premium-panel p-4 md:p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <ArrowRightLeft className="w-6 h-6 premium-icon" />
                        </div>
                        <h2 className="text-xl font-medium">Recent Transactions</h2>
                    </div>
                    <Link to="/transactions" className="hidden md:flex cyber-button items-center space-x-2">
                        <span>Transactions</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="space-y-4">
                    {transactions.length > 0 ? (
                        transactions.map((tx, key) => {
                            const createdAt = new Date(tx.created_at);
                            const formattedDate = isNaN(createdAt) ? 'Invalid Date' : createdAt.toLocaleDateString() + ' at ' + createdAt.toLocaleTimeString();

                            return (
                                <div key={key} className="premium-panel p-4 rounded-lg hover:bg-cyan-500/5 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2 bg-gray-800 rounded-lg">
                                                {getTransactionIcon(tx.address_from !== userData.web3_address ? 'receive' : 'send')}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-200">
                                                    {tx.address_from !== userData.web3_address ? 'Received from ' : 'Sent to '}
                                                    {shortenAddress(tx.address_to)}
                                                </p>
                                                <p className="text-sm text-gray-400">{formattedDate}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-medium ${
                                                tx.tx_type === 'receive' || tx.tx_type === 'chest_win' ? 'text-green-400' :
                                                    tx.tx_type === 'send' ? 'text-red-400' : 'text-gray-300'
                                            }`}>
                                                {tx.address_from !== userData.web3_address ? '+' : '-'}{tx.amount} {tx.tx_contract}
                                            </p>
                                            <p className={`text-sm ${
                                                tx.status === 1 ? 'text-green-400' :
                                                    tx.status === 0 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                                {tx.status === 1 ? 'Completed' : 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No transactions found</p>
                        </div>
                    )}
                </div>

                <Link to="/transactions" className="mt-6 w-full cyber-button flex md:hidden items-center justify-between space-x-2">
                    <span>Transactions</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
};

export default LastTransactions;