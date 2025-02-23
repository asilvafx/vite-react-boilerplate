import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <section className="w-full max-w-screen-lg mx-auto my-10">
            <div className="flex">
                <h1 className="text-3xl font-bold neon-text mb-8">{title ?? ''}</h1>
            </div>
        </section>
    )
}

export default SectionTitle;