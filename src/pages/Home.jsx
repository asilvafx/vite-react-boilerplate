import React, { useState } from 'react'; 
import { Helmet } from 'react-helmet-async'; 
import { useTranslation } from 'react-i18next';   
import Header from '../components/Header';
import HeroSection from "../components/HeroSection";
import ContentSection from "../components/ContentSection";
import FeaturesSection from "../components/FeaturesSection.jsx";
import ModalCreate from "../components/ModalCreate.jsx";

const Home = () => {
  const { t } = useTranslation(); 

  return (
    <>
    <Helmet>
    <title>{t('seo_title')}</title>
    <meta name='description' content={t('seo_description')} />
    </Helmet>
    <Header />
    <HeroSection />
    <ContentSection />
    <FeaturesSection />
      <ModalCreate show={false} />
    </>
  );
};

export default Home;
