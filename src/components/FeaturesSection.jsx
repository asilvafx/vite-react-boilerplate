import React, { Suspense, useRef, useEffect } from 'react';
import { ArrowRight, Wallet, Zap, Lock, Globe, Cpu } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const FeaturesSection = () => {
    const splineRef = useRef(null);

    const handleScroll = () => {
        if (splineRef.current) {
            const scrollY = window.scrollY;
            // Adjust the rotation based on scroll
            const rotationX = scrollY * 0.1; // Adjust the multiplier for sensitivity
            const rotationY = scrollY * 0.1; // Adjust the multiplier for sensitivity
            splineRef.current.setRotation(rotationX, rotationY, 0); // Rotate around X and Y axes
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex gap-12 items-center">
                    <div className="absolute">
                        <div className="h-[600px] w-full">
                            <Suspense fallback={<></>}>
                                <Spline
                                    ref={splineRef}
                                    scene="https://prod.spline.design/UmTyqfPzW1R4uwfm/scene.splinecode"
                                />
                            </Suspense>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                Revolutionary Token Features
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Experience the next generation of decentralized finance with $BOLT's innovative features.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                                <p className="text-gray-400">Near-instant transactions with minimal gas fees across multiple chains.</p>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Lock className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Ultra Secure</h3>
                                <p className="text-gray-400">Military-grade encryption with multi-signature protection.</p>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Globe className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Cross-Chain</h3>
                                <p className="text-gray-400">Seamless integration across multiple blockchain networks.</p>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border -gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Cpu className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
                                <p className="text-gray-400">Automated and secure transactions through smart contract technology.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;