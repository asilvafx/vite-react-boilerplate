import React from 'react';

const Loading = () => {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-inherit text-center px-4">
            <div className="w-full max-w-xs h-2 rounded bg-neutral-900 border-md overflow-hidden mb-4 relative">
                <div
                    className="h-full bg-neutral-100 animate-loading"
                    style={{ width: '50%', animationTimingFunction: 'ease-in-out' }}
                />
            </div>
            <p className="text-white text-sm font-medium">Loading...</p>

            <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading {
          animation: loading 1.5s infinite;
        }
      `}</style>
        </div>
    );
};

export default Loading;
