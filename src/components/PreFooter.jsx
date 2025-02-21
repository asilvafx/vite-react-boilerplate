import React from 'react';
import { Heart, AlertTriangle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const PreFooter = () => {
    return (
        <section className="w-full max-w-screen-lg mb-10 mx-auto">
            <div className="grid grid-cols-1 gap-8 mb-8">
                {/* Disclaimer */}
                <div className="premium-panel p-6 rounded-xl bg-yellow-500/5">
                    <div className="flex items-start space-x-3 p-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0"/>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-yellow-400">Risk Disclaimer</h3>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p>
                                    Cryptocurrency trading and gambling involve substantial risk and may not be suitable
                                    for all investors.
                                    The high degree of leverage can work against you as well as for you.
                                </p>
                                <p>
                                    Before deciding to trade or participate in games involving cryptocurrency, you
                                    should carefully consider
                                    your investment objectives, level of experience, and risk appetite. The possibility
                                    exists that you could
                                    sustain a loss of some or all of your initial investment.
                                </p>
                                <p>
                                    You should be aware of all the risks associated with cryptocurrency trading and
                                    gambling, and seek advice
                                    from an independent financial advisor if you have any doubts.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 gap-4 mt-8 p-4">
                        <LanguageSelector/>
                        <div className="my-auto p-4">
                            <ul className="flex flex-wrap items-center justify-between">
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-gray-300">Terms of
                                        Service</a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-gray-300">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-gray-400 hover:text-gray-300">Cookie Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="mx-auto text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} PIGMIL. All rights reserved.
                </p>
            </div>
        </section>
    )
}

export default PreFooter;