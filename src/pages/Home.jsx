import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import CtaSection from '../components/CtaSection';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>PIGMIL – Web Solutions for a Digital Future</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            {/* Header */}
            <Header />

            {/* Hero Section */}
            <HeroSection /> 

            {/* CTA Banner */}
            <CtaSection />

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Home;