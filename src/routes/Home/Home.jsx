import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

import reactLogo from '../../assets/react.svg';
import viteLogo from '../../assets/vite.svg';

import LanguageSelector from '../../components/LanguageSelector';

function Home() {
    const { t } = useTranslation();
    const { user, isAuthenticated } = useAuth();

    if(isAuthenticated){
        console.log(user);
    }

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
                <motion.div
                    className="flex gap-4 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                >
                    <motion.a whileHover={{ scale: 1.1 }} href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.1 }} href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </motion.a>
                </motion.div>

                <motion.h1
                    className="text-3xl font-bolder mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {user?.displayName ? (
                        <span>Welcome back, {user?.displayName}</span>
                    ) : (
                        <span>Vite + React</span>
                    )}
                </motion.h1>

                <motion.nav
                    className="flex gap-2 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link to='/shop'>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-black text-white"
                        >
                            Shop
                        </motion.button>
                    </Link>
                    {!isAuthenticated ? (
                        <Link to='/auth'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-blue-600 text-white"
                            >
                                Click here to login
                            </motion.button>
                        </Link>
                    ) : (
                        <>
                            <Link to='/logout'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-red-500 text-white"
                                >
                                    Logout
                                </motion.button>
                            </Link>
                            <Link to='/private'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-blue-600 text-white"
                                >
                                    Private Route
                                </motion.button>
                            </Link>
                        </>

                    )}
                </motion.nav>
                <div className="absolute top-0 right-0 m-2 md:m-4 xl:m-6">
                    <LanguageSelector />
                </div>
            </motion.section>
        </>
    );
}

export default Home;
