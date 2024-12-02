import React, { useState } from 'react'; 
import { Helmet } from 'react-helmet-async'; 
import { useTranslation } from 'react-i18next';   
import Header from '../components/Header';

const Home = () => {
  const { t } = useTranslation(); 

  return (
    <>
    <Helmet>
    <title>{t('seo_title')}</title>
    <meta name='description' content={t('seo_description')} />
    </Helmet>
    <Header />
    </>
  );
};

export default Home;
