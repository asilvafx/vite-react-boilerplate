import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useUser  } from '../context/UserProvider';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import UserStats from '../components/UserStats';
import QuickActions from '../components/QuickActions';
import ManageAccount from '../components/ManageAccount';
import ContactList from '../components/ContactList';
import WorldIDVerification from '../components/WorldIDVerification';
import DailyReward from '../components/DailyReward';
import Loading from '../components/Loading';

const Dashboard = () => {
    const { userData } = useUser ();

    const { t } = useTranslation();

    // If userData is not available, show the loading component
    if (!userData) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>PIGMIL – Web Solutions for a Digital Future</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            <AppHeader />

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