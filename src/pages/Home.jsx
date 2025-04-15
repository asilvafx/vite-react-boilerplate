import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            {/* Hero Section */}
            <section className="relative overflow-hidden w-full max-w-screen-xl mx-auto">

                {/* Hero Content */}
                <div className="container mx-auto px-4 py-24 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Welcome to <span className="text-cyan-400">Web</span> App
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 mb-8">
                            Discover amazing features with unbeatable tech and exceptional performance.
                            Create your app today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/login"
                                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg font-semibold transition-colors duration-200"
                            >
                                Login / Register
                            </Link>
                            <Link
                                to="/"
                                className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white/20 rounded-lg font-semibold transition-colors duration-200"
                            >
                               Github
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
