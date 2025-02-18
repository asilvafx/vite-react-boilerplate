import React from 'react'; 
import * as PropTypes from "prop-types";
import polygonIcon from '../assets/polygon.jpg';
import tokenIcon from '../assets/ned.jpg';

class TokenBalanceSection extends React.Component {
    render() {
        let {walletData} = this.props;

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
                                    {walletData.balances.POL} POL
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
                                    {walletData.balances.BOLT} BOLT
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
}

TokenBalanceSection.propTypes = {walletData: PropTypes.any}

export default TokenBalanceSection;