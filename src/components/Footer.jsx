import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { FaXTwitter, FaDiscord, FaGithubAlt } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const footerMenuItems = [
    {
        title: "Protocol",
        links: [
            { name: "Tokenomics", href: "#" },
            { name: "Whitepaper", href: "#" },
            { name: "Roadmap", href: "#" },
            { name: "Governance", href: "#" },
        ],
    },
    {
        title: "Developers",
        links: [
            { name: "Documentation", href: "#" },
            { name: "GitHub", href: "#" },
            { name: "Bug Bounty", href: "#" },
            { name: "Audits", href: "#" },
        ],
    },
    {
        title: "Community",
        links: [
            { name: "Discord", href: "#" },
            { name: "Telegram", href: "#" },
            { name: "X", href: "#" },
            { name: "Blog", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "FAQ", href: "#" },
            { name: "Media Kit", href: "#" },
            { name: "Careers", href: "#" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="text-gray-300">
            <div className="max-w-screen-lg mx-auto px-6 lg:px-8">

                {/* Main Footer Content */}
                <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
                    {footerMenuItems.map((section, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="text-white text-lg font-semibold tracking-wide">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a href={link.href} className="inline-block text-gray-400 hover:text-primary transition-colors duration-200">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="py-10 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-900 flex items-center justify-center transition-colors duration-200">
                                <FaGithubAlt size={20} className="text-gray-300" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-900 flex items-center justify-center transition-colors duration-200">
                                <FaXTwitter size={20} className="text-gray-300" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-900 flex items-center justify-center transition-colors duration-200">
                                <FaTelegramPlane size={20} className="text-gray-300" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-900 flex items-center justify-center transition-colors duration-200">
                                <FaDiscord size={20} className="text-gray-300" />
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>Built with</span>
                            <Heart size={16} className="text-blue-500 animate-pulse" />
                            <span>&copy; {new Date().getFullYear()} PIGMIL. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;