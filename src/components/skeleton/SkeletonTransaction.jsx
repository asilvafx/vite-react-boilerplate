import React from 'react';

const SkeletonTransaction = () => {
    return (
        <div className="premium-panel p-4 rounded-lg animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-800 rounded-lg w-10 h-10"></div>
                    <div>
                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-1"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonTransaction;