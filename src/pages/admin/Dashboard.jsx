import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>

            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Stats Card */}
                        <div className="bg-blue-500 text-white rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                            <p className="text-3xl font-bold">2</p>
                        </div>

                        {/* Admin Info Card */}
                        <div className="bg-green-500 text-white rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">Admin Info</h3>
                            <p className="mb-1">Name: {user?.name}</p>
                            <p>Email: {user?.email}</p>
                        </div>

                        {/* System Status Card */}
                        <div className="bg-purple-500 text-white rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-2">System Status</h3>
                            <p className="text-xl">Active</p>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between">
                                    <span>New user registered</span>
                                    <span className="text-sm text-gray-500">2 hours ago</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>System backup completed</span>
                                    <span className="text-sm text-gray-500">5 hours ago</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Security update installed</span>
                                    <span className="text-sm text-gray-500">1 day ago</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Dashboard;
