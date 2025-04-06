import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>Welcome</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>

            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden w-full max-w-screen-xl mx-auto">

                {/* Hero Content */}
                <div className="container mx-auto px-4 py-24 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Welcome to Our <span className="text-cyan-400">Digital</span> Store
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 mb-8">
                            Discover amazing products with unbeatable prices and exceptional quality.
                            Start your shopping journey today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/shop"
                                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black rounded-lg font-semibold transition-colors duration-200"
                            >
                                Start Shopping
                            </Link>
                            <Link
                                to="/about"
                                className="px-8 py-3 bg-transparent hover:bg-white/10 border border-white/20 rounded-lg font-semibold transition-colors duration-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                            <p className="text-gray-400">Get your products delivered quickly and securely to your doorstep.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                            <p className="text-gray-400">Your transactions are protected with state-of-the-art security.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                            <p className="text-gray-400">Our customer service team is always here to help you.</p>
                        </div>
                    </div>
                </div>

            </section>

            {/* Featured Products Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 ">
                        Featured Products
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Sample Featured Products */}
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
                                <div className="aspect-w-1 aspect-h-1">
                                    <img
                                        src={`https://via.placeholder.com/400x400`}
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">Product {item}</h3>
                                    <p className="text-gray-500 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-cyan-600 font-bold">$99.99</span>
                                        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-medium transition-colors duration-200">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-gradient-to-t from-gray-300 dark:from-gray-900 to-white dark:to-black py-20 rounded-xl">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold  mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Subscribe to our newsletter for the latest products, deals, and updates.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors duration-200 text-white"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Home;
