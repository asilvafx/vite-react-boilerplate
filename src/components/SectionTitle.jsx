import React from 'react';
// import ThreeBackground from './ThreeBackground';

const SectionTitle = ({ title }) => {
    return (
        <section className="w-full max-w-screen-lg mx-auto my-10 relative">
            {/*
            <div id="canvas-3d" className="-top-64 -right-56 md:left-0 absolute">
                <ThreeBackground />
            </div>
            */}

            <div className="p-2 flex relative z-10"> {/* Ensure title is above the background */}
                <h1 className="text-3xl font-bold neon-text mb-8">{title ?? ''}</h1>
            </div>
        </section>
    );
}

export default SectionTitle;