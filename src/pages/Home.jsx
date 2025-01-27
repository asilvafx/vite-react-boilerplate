import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { motion } from "framer-motion"; // Corrected import for motion
import { Button } from "flowbite-react";

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
                className="relative w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080')" }} // Replace with your image URL
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { duration: 1 }
                }}
            >
                <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white p-5">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">{t('hero_title')}</h1>
                        <p className="text-lg md:text-xl mb-8">{t('hero_subtitle')}</p>
                        <p className="text-md md:text-lg mb-8">{t('hero_description')}</p>
                        <div className="flex justify-center space-x-4">
                            <Button
                                href="#"
                                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                {t('hero_button_primary')}
                            </Button>
                            <Button
                                href="#"
                                className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-semibold py-2 px-4 rounded"
                            >
                                {t('hero_button_secondary')}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Home;