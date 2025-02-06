import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-neon-blue">
                    🚀 Build. Scale. Dominate.
                </h1>
                <h2 className="text-2xl md:text-3xl mt-4">
                    Websites. Online Stores. CMS's. dApps.
                </h2>
                <p className="mt-6 text-lg md:text-xl">
                    Your business needs a killer digital presence—we build it.
                </p>
                <ul className="mt-4 space-y-2">
                    <li>✅ Fast. Secure. Scalable.</li>
                    <li>✅ Custom-tailored solutions.</li>
                    <li>✅ No BS. Just results.</li>
                </ul>
                <Link to="/sample">
                    <button className="mt-8 px-6 py-3 font-bold rounded-full transition duration-300">
                        Get Started
                    </button>
                </Link>
            </section>
        </>
    );
};

export default Home;
