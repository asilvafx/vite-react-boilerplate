import React from 'react';
import polygonIcon from '../assets/polygon.jpg';
import tokenIcon from '../assets/ned.jpg';
import { useUser  } from '../context/UserProvider';
import { loadConfig, getSiteData } from '../lib/site';

const TokenBalanceSection = () => {
    const { userData } = useUser ();
    const siteData = getSiteData();

    const userBalance = {
        chain: parseFloat(userData?.web3_network_token_balance),
        contract: parseFloat(userData?.web3_available_balance)
    };

    function calculateRate(amount, currency) {
        if (currency === loadConfig.WEB3_CHAIN_SYMBOL) {
            // 1 POL = 0.292303 USD
            return amount * 0.292303; // Convert POL to USD
        } else if (currency === loadConfig.WEB3_CONTRACT_SYMBOL) {
            // 1 NED = 0.10 POL
            // 1 POL = 0.292303 USD
            return (amount * 0.10) * 0.292303; // Convert NED to USD
        }
        return 0; // Default case
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="premium-panel p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/10 rounded-full">
                            <img className="rounded-full h-8 w-8" width="40" height="40" alt={loadConfig.WEB3_CHAIN_NAME} src={polygonIcon} />
                        </div>
                        <div className="w-full flex flex-col">
                            <p className="text-sm text-gray-400">{loadConfig.WEB3_CHAIN_SYMBOL} Balance</p>
                            <div className="w-full flex items-center justify-between gap-4">
                                <p className="text-xl font-medium neon-text">
                                    {userBalance.chain.toFixed(3)} {loadConfig.WEB3_CHAIN_SYMBOL}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ≃ ${calculateRate(userBalance.chain, loadConfig.WEB3_CHAIN_SYMBOL).toFixed(2)} USD
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-panel p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/10 rounded-full">
                            <img className="rounded-full h-8 w-8" width="40" height="40" alt={loadConfig.WEB3_CONTRACT_NAME} src={tokenIcon} />
                        </div>
                        <div className="w-full flex flex-col">
                            <p className="text-sm text-gray-400">{loadConfig.WEB3_CONTRACT_SYMBOL} Balance</p>
                            <div className="w-full flex items-center justify-between gap-4">
                                <p className="text-xl font-medium neon-text">
                                    {userBalance.contract.toFixed(3)} {loadConfig.WEB3_CONTRACT_SYMBOL}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ≃ ${calculateRate(userBalance.contract, loadConfig.WEB3_CONTRACT_SYMBOL).toFixed(2)} USD
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TokenBalanceSection;