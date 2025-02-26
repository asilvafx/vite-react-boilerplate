import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useUser  } from '../context/UserProvider';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import UserStats from '../components/UserStats';
import QuickActions from '../components/QuickActions';
import WorldIDVerification from '../components/WorldIDVerification';
import DailyReward from '../components/DailyReward';
import Loading from '../components/Loading';
import SectionTitle from "../components/SectionTitle";
import ProfileInfo from "../components/ProfileInfo";

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

            <AppHeader/>
            <SectionTitle title='My Account' />
            <WorldIDVerification isVerified={userData?.is_verified}/>
            <DailyReward/>
            <ProfileInfo />
            <UserStats/>
            <QuickActions/>
            <AppFooter/>
        </>
    );
};

export default Dashboard;