import React from 'react';
import { prizeDistributions } from '../lib/chests'; // Import prize distributions
import {loadConfig} from '../lib/site';

const PrizeDistribution = ({ planName }) => {
    const distribution = prizeDistributions[planName]; // Get the distribution based on the plan name

    if (!distribution) return null; // Return null if no distribution found

    return (
        <div className="premium-panel p-6 rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4">Prize Distribution</h2>
            <div className="space-y-2">
                {/* Display Creator Reward */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Creator Reward ({distribution.creatorReward.percentage})</span>
                    <span className="font-medium text-cyan-400">
                        {parseFloat(distribution.creatorReward.tokens).toFixed(3)} ${loadConfig.WEB3_CONTRACT_SYMBOL}
                    </span>
                </div>

                {/* Display System Fee */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">System Fee ({distribution.systemFee.percentage})</span>
                    <span className="font-medium text-cyan-400">
                        {parseFloat(distribution.systemFee.tokens).toFixed(3)} ${loadConfig.WEB3_CONTRACT_SYMBOL}
                    </span>
                </div>

                {/* Display Prize Breakdown */}
                <div className="flex flex-col">
                    <h3 className="text-lg font-medium mt-4">Prize Breakdown</h3>
                    {distribution.breakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{item.rank}{item.rank === "1" ? 'st' : (item.rank === "2" ? 'nd' : 'th')} ({item.percentage})</span>
                            <span className="font-medium text-cyan-400">{parseFloat(item.tokens).toFixed(3)} ${loadConfig.WEB3_CONTRACT_SYMBOL}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PrizeDistribution;