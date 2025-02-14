import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, Coins } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-transparent via-transparent to-white dark:to-black text-gray-300">
            <div className="max-w-screen-lg mx-auto px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Protocol Info */}
                    <div className="space-y-6">
                        <h3 className="text-black dark:text-white text-lg font-semibold tracking-wide">Protocol</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Tokenomics
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Whitepaper
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Roadmap
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Governance
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Developers */}
                    <div className="space-y-6">
                        <h3 className="text-black dark:text-white text-lg font-semibold tracking-wide">Developers</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Bug Bounty
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Audits
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="space-y-6">
                        <h3 className="text-black dark:text-white text-lg font-semibold tracking-wide">Community</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Discord
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Forum
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6">
                        <h3 className="text-black dark:text-white text-lg font-semibold tracking-wide">Resources</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2">
                                <Mail size={18} className="text-gray-600"/>
                                support@bolt.network
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Brand Assets
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Media Kit
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="inline-block text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-10 border-t border-gray:200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <a href="#"
                               className="w-10 h-10 rounded-full bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 flex items-center justify-center
                            transition-colors duration-200">
                                <Github size={20} className="text-gray-700 dark:text-gray-300"/>
                            </a>
                            <a href="#"
                               className="w-10 h-10 rounded-full bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 flex items-center justify-center
                            transition-colors duration-200">
                                <Twitter size={20} className="text-gray-700 dark:text-gray-300"/>
                            </a>
                            <a href="#"
                               className="w-10 h-10 rounded-full bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 flex items-center justify-center
                            transition-colors duration-200">
                                <Coins size={20} className="text-gray-700 dark:text-gray-300"/>
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Built with</span>
                            <Heart size={16} className="text-blue-500 animate-pulse"/>
                            <span>© 2024 BOLT Network. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;