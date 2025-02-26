import React from 'react';
import {AlertTriangle} from "lucide-react";

const RiskDisclaimer = () => {
    return (
        <div className="grid gap-8 mb-8">
            {/* Disclaimer */}
            <div className="premium-panel p-4 md:p-6 rounded-xl bg-yellow-500/5">
                <div className="flex items-start space-x-3">

                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <AlertTriangle className="w-4 h-4 fill-yellow-400"/>
                            <h3 className="font-medium text-yellow-400">Risk Disclaimer</h3>
                        </div>
                        <div className="space-y-2 text-sm uppercase">
                            <p className="text-gray-400">
                                Cryptocurrency trading and gambling involve substantial risk and may not be suitable
                                for all investors.
                                The high degree of leverage can work against you as well as for you.
                            </p>
                            <p className="text-gray-400">
                                Before deciding to trade or participate in games involving cryptocurrency, you
                                should carefully consider
                                your investment objectives, level of experience, and risk appetite. The possibility
                                exists that you could
                                sustain a loss of some or all of your initial investment.
                            </p>
                            <p className="text-gray-400">
                                You should be aware of all the risks associated with cryptocurrency trading and
                                gambling, and seek advice
                                from an independent financial advisor if you have any doubts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RiskDisclaimer;