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
                <title>PIGMIL – Web Solutions for a Digital Future</title>
                <meta name='description' content={t('seo_description')} />
            </Helmet>

            <Header />
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
                <h1 className="text-5xl md:text-7xl font-bold text-neon-blue">
                    🚀 Build. Scale. Dominate.
                </h1>
                <h2 className="text-2xl md:text-3xl mt-4">
                    Websites. Online Stores. dApps. ERC-20 Tokens.
                </h2>
                <p className="mt-6 text-lg md:text-xl">
                    Your business needs a killer digital presence—we build it.
                </p>
                <ul className="mt-4 space-y-2">
                    <li>✅ Fast. Secure. Scalable.</li>
                    <li>✅ Custom-tailored solutions.</li>
                    <li>✅ No BS. Just results.</li>
                </ul>
                <button className="mt-8 px-6 py-3 font-bold rounded-full transition duration-300">
                    Get a Quote
                </button>
            </section>

            {/* Our Technology Partners */}
            <section className="py-20 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Our Technology Partners
                </h2>
                <div className="flex overflow-x-auto space-x-8 mt-8 justify-center">
                    <img alt="Google logo" className="h-20" src="https://storage.googleapis.com/a1aa/image/_ISnBc1msvKXT97txpk_le0C8blkSp3tHOms2y1VwEc.jpg" />
                    <img alt="Meta logo" className="h-20" src="https://storage.googleapis.com/a1aa/image/POEUgJs4t2OthJ1zFMkr-gOLOK27-CviAsFN8-SzuMQ.jpg" />
                    <img alt="Ethereum logo" className="h-20" src="https://storage.googleapis.com/a1aa/image/qgrQnkOAIfP31VMD-xrHE5g64bNP3R_WoNMVBLFr0Tc.jpg" />
                    <img alt="OpenAI logo" className="h-20" src="https://storage.googleapis.com/a1aa/image/EX680EWRafk0lWswhVih3YR8W5Vq0Hr_xvFb9KtXPf8.jpg" />
                    <img alt="Stripe logo" className="h-20" src="https://storage.googleapis.com/a1aa/image/6YNoDD0ZbQi--OsdX8qFQf0PM7kZBhF0QmTiL7QIFcw.jpg" />
                    <img alt="PayPal logo" className="h-20" src="https://storage.googleapis.com/a1aa/image/PzJlIJxXcPMxTnUVqUApyxUEvOPH_Th5kV2MBlxhEVQ.jpg" />
                </div>
            </section>

            {/* Our Services */}
            <section className="py-20 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">🌐 Websites & Online Stores</h3>
                        <p className="mt-4">🚀 Custom-built from the ground up.</p>
                        <p>🛒 Scalable eCommerce that converts.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">⚡ dApps & Web3 Solutions</h3>
                        <p className="mt-4">🔗 Decentralized & secure applications.</p>
                        <p>📈 Smart contracts & blockchain integrations.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">💰 ERC-20 Token Development</h3>
                        <p className="mt-4">🔧 Your own crypto token, built right.</p>
                        <p>💡 Custom use cases & integration.</p>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <button className="px-6 py-3 font-bold rounded-full transition duration-300">
                        Start Your Project
                    </button>
                </div>
            </section>

            {/* Why Choose PIGMIL? */}
            <section className="py-20 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Why Choose PIGMIL?
                </h2>
                <ul className="mt-8 space-y-4 text-lg">
                    <li>✅ Experienced & Dedicated Team – We know our craft.</li>
                    <li>🚀 Fast Delivery – No delays, no excuses.</li>
                    <li>🔒 Certified Partnerships – Google, Meta, Ethereum & more.</li>
                    <li>🌍 Worldwide Assistance – Multilingual support (🇬🇧 🇵🇹 🇪🇸 🇫🇷).</li>
                    <li>📞 24/7 Support – Your business never sleeps, neither do we.</li>
                </ul>
            </section>

            {/* Extras */}
            <section className="py-20 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Extras (Power-Up Your Business)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">✨ SEO & Security</h3>
                        <p className="mt-4">Advanced optimization & protection.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">📣 Social Media Marketing (SMM)</h3>
                        <p className="mt-4">Ads, campaigns, engagement.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">💳 Custom Payment Gateways</h3>
                        <p className="mt-4">Get paid, your way.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold">📊 Branding & Strategy</h3>
                        <p className="mt-4">Guidelines, UI/UX & more.</p>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <button className="px-6 py-3 font-bold rounded-full transition duration-300">
                        Boost Your Business Now!
                    </button>
                </div>
            </section>

            {/* Developer Section */}
            <section className="py-20 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                    Developer Section (Open Source & Dev Hub)
                </h2>
                <div className="mt-8 text-center">
                    <p>Showcase GitHub Repos & Open Source Contributions.</p>
                    <a className="text-neon-blue underline" href="https://github.com">
                        Check Out Our Open Source Projects
                    </a>
                </div>
            </section>

            {/* Call-to-Action */}
            <section className="py-20 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Let’s turn your vision into reality.
                </h2>
                <form className="mt-8 space-y-4">
                    <input className="w-full p-3 rounded-lg bg-gray-800 text-white" placeholder="Name" type="text" />
                    <input className="w-full p-3 rounded-lg bg-gray-800 text-white" placeholder="Email" type="email" />
                    <textarea className="w-full p-3 rounded-lg bg-gray-800 text-white" placeholder="Project Details"></textarea>
                    <button className="px-6 py-3 bg-neon-pink text-white font-bold rounded-full hover:bg-neon-pink-dark transition duration-300" type="submit">
                        Contact Us
                    </button>
                </form>
                <div className="mt-8">
                    <p>📍 Locations – France & Portugal | Global Services</p>
                    <p>🌍 Support Languages – English, Portuguese, Spanish, French</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 text-center bg-gray-800">
                <nav className="space-x-4">
                    <a className="hover:underline" href="#">🏠 Home</a>
                    <a className="hover:underline" href="#">📞 Contact</a>
                    <a className="hover:underline" href="#">📜 Terms & Privacy</a>
                    <a className="hover:underline" href="#">🚀 Careers</a>
                </nav>
                <p className="mt-4">💻 PIGMIL – Web Solutions for a Digital Future.</p>
            </footer>
        </>
    );
};

export default Home;