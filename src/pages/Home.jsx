import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { motion } from "motion/react"

const Home = () => {
  const { t } = useTranslation();

  return (
      <>
        <Helmet>
          <title>{t('seo_title')}</title>
          <meta name='description' content={t('seo_description')} />
        </Helmet>

        <Header />
          <motion.div
              className="w-full max-w-4xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{
                  opacity: 1,
                  transition: { duration: 1 }
              }}
          >
              <h1>Hello World</h1>
          </motion.div>
      </>
  );
};

export default Home;