import React, { useState } from 'react';
import { Label } from 'flowbite-react';
import {toast} from "react-hot-toast";
import {User} from "lucide-react";
import {useUser} from "../context/UserProvider";
import LanguageSelector from "./LanguageSelector.jsx";

const ManageAccount = () => {
    const {userData} = useUser();
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        username: userData?.displayName,
        email: userData?.email,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log('Update profile:', profileData);
        toast.success('Profile updated successfully');
    };

    const handleEmailUpdate = (e) => {
        e.preventDefault();
        console.log('Update email:', profileData.email);
        toast.success('Email updated successfully');
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        console.log('Update password:', passwordData);
        toast.success('Password updated successfully');
    };

    return (
        <section className="w-full max-w-screen-lg mx-auto mb-10">
            <div className="w-100 premium-panel p-4 md:p-6 rounded-xl mb-10">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <User  className="w-6 h-6 premium-icon"/>
                    </div>
                    <h2 className="text-xl font-medium">Account Details</h2>
                </div>

                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'profile'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'security'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Security
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div>
                            <Label htmlFor="username" value="Username" className="text-gray-300 mb-2"/>
                            <input
                                className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                id="username"
                                type="text"
                                value={profileData.username}
                                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                                required
                            />
                        </div>
                        <button type="submit" className="cyber-button w-full">
                            <span>Update Profile</span>
                        </button>
                    </form>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-6">
                        <div className="premium-panel p-4 md:p-6 rounded-lg bg-cyan-500/5">
                            <h3 className="text-lg font-medium mb-4">Change Email</h3>
                            <form onSubmit={handleEmailUpdate} className="space-y-4">
                                <div>
                                    <Label htmlFor="email" value="Email" className="text-gray-300 mb-2"/>
                                    <input
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <button type="submit" className="cyber-button w-full">
                                    Update Email </button>
                            </form>
                        </div>

                        <div className="premium-panel p-4 md:p-6 rounded-lg bg-cyan-500/5">
                            <h3 className="text-lg font-medium mb-4">Change Password</h3>
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <div>
                                    <Label htmlFor="currentPassword" value="Current Password" className="text-gray-300 mb-2"/>
                                    <input
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        id="currentPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({
                                            ...passwordData,
                                            currentPassword: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="newPassword" value="New Password" className="text-gray-300 mb-2"/>
                                    <input
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        id="newPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword" value="Confirm New Password" className="text-gray-300 mb-2"/>
                                    <input
                                        className="bg-neutral-900/50 premium-border shadow-sm w-full rounded-lg"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value
                                        })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="cyber-button w-full">
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <LanguageSelector/>
        </section>
    );
};

export default ManageAccount;