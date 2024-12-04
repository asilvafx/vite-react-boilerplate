import React from 'react';
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
          <div className="w-full max-w-4xl mx-auto px-4">
              <h1>Hello World</h1>
          </div>
      </>
  );
};

export default Home;