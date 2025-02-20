// src/Dashboard.jsx
import React from 'react';
import { useUser  } from '../context/UserProvider';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import UserStats from '../components/UserStats';
import QuickActions from '../components/QuickActions';
import ManageAccount from '../components/ManageAccount';
import ContactList from '../components/ContactList';
import WorldIDVerification from '../components/WorldIDVerification';
import DailyReward from '../components/DailyReward';

const Dashboard = () => {
    const { userData } = useUser ();

    return (
        <>
            <Header />

            <WorldIDVerification isVerified={userData?.is_verified} />
            <UserStats />
            <DailyReward />
            <QuickActions />
            <ManageAccount userData={userData} />
            <ContactList
                contacts={[
                    { id: '1', name: 'Alice', address: '0x1234567890abcdef1234567890abcdef12345678' },
                    { id: '2', name: 'Bob', address: '0xabcdef1234567890abcdef1234567890abcdef12' },
                    { id: '3', name: 'Charlie', address: '0x7890abcdef1234567890abcdef1234567890abcd' },
                ]}
            />
            <AppFooter />
        </>
    );
};

export default Dashboard;