import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

const AnnouncementBar = () => {
    const [announcements, setAnnouncements] = useState([
        { id: 1, text: "New feature: Horse Racing game now available! Try your luck today.", type: 'info' },
        { id: 2, text: "Flash sale: Get 20% extra BOLT tokens on all purchases this weekend!", type: 'info' },
        { id: 3, text: "Hot drop: New premium treasure chests just added with 2x rewards", type: 'info' },
        { id: 4, text: "Scheduled maintenance: April 30th, 2-4 AM UTC. Some services may be unavailable.", type: 'info' },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const scrollRef = useRef(null);
    const intervalRef = useRef(null);

    const startScrolling = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex(prev => (prev + 1) % announcements.length);
            }
        }, 5000);
    };

    useEffect(() => {
        startScrolling();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, announcements.length]);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + announcements.length) % announcements.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % announcements.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || announcements.length === 0) return null;

    const currentAnnouncement = announcements[currentIndex];

    return (
        <>
            <div className="float-bar w-full max-w-screen-lg mx-auto fixed top-0 left-0 right-0 md:p-4 lg:py-4 lg:px-0">
                <div className="relative flex items-center justify-between body-bg backdrop-blur-md overflow-hidden py-4 px-6 md:px-4 m-0 !rounded-none md:!rounded-lg border-b border-neutral-700 shadow-neon-primary">
                    <div className="flex text-truncate items-center space-x-2 mr-2 md:mr-4 !p-0">
                        <div className={`flex items-center gap-1 rounded-full`}>
                            <Sparkles className="w-4 h-4"/>
                            <span className="text-xs hidden md:inline-block uppercase font-semibold tracking-wider text-gray-400">
                                Announcement
                            </span>

                            <div
                                ref={scrollRef}
                                className="flex overflow-hidden whitespace-nowrap p-0"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
                                <div className={`ms-1 inline-block w-full text-sm ${isPaused ? '' : 'marquee'}`}>
                                    <span
                                        className={`text-${currentAnnouncement.type === 'warning' ? 'amber' : currentAnnouncement.type === 'success' ? 'emerald' : 'cyan'}-400`}>
                                        {currentAnnouncement.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-auto !p-0">
                        <button
                            onClick={handlePrev}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4"/>
                        </button>
                        <div className="text-xs text-gray-500">
                            {currentIndex + 1}/{announcements.length}
                        </div>
                        <button
                            onClick={handleNext}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleClose}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors ml-2"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full min-h-14 md:min-h-20"></div>
        </>
    );
};

export default AnnouncementBar;