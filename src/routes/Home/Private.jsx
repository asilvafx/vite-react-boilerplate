import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { motion } from 'framer-motion';

function Home() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="p-8 w-screen max-w-2xl flex flex-col justify-center items-center m-auto"
            >

                <motion.h1
                    className="text-3xl font-bolder mb-4"
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                >
                    <span>Test Private Route</span>
                </motion.h1>

                <motion.nav
                    className="flex gap-2 items-center"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.6}}
                >
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
                    </div>
                </motion.nav>
            </motion.section>
        </>
    );
}

export default Home;
