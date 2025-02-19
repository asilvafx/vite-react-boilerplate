import React from 'react';
import polygonIcon from '../assets/polygon.jpg';
import tokenIcon from '../assets/ned.jpg';
import { useUser } from '../context/UserProvider';

const TokenBalanceSection = () => {

const { userData } = useUser();

return (
    <>
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="premium-panel p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-full">
                        <img className="rounded-full h-8 w-8" width="40" height="40" alt="Polygon PoS" src={polygonIcon} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">POL Balance</p>
                        <p className="text-xl font-medium neon-text">
                            {userData?.web3_network_token_balance} POL
                        </p>
                    </div>
                </div>
            </div>

            <div className="premium-panel p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/10 rounded-full">
                        <img className="rounded-full h-8 w-8" width="40" height="40" alt="BOLT"
                             src={tokenIcon}/>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">BOLT Balance</p>
                        <p className="text-xl font-medium neon-text">
                            {userData?.web3_custom_token_balance} BOLT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default TokenBalanceSection;