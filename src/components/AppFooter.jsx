import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HandCoins, SendToBack, Send, Wallet } from 'lucide-react';

const Navigation = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: '/receive', label: 'Receive', icon: HandCoins },
        { path: '/exchange', label: 'Exchange', icon: SendToBack },
        { path: '/send', label: 'Send', icon: Send },
        { path: '/dashboard', label: 'Wallet', icon: Wallet },
    ];

    const navClasses = isMobile
        ? 'fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-gray-800 px-6 py-4'
        : 'hidden';

    if (!isMobile) {
        return (
            <>
                <div className="w-full min-h-10"></div>
            </>
        );
    }

    return (
        <>
        <div className="w-full min-h-24"></div>
        <nav className={navClasses}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">

                    <div className={`flex items-center justify-between w-full pb-4`}>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors
                    ${isActive
                                        ? 'text-cyan-400 bg-cyan-500/10'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
        </>
    );
};

export default Navigation;