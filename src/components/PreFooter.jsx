import React from 'react';
import {loadConfig} from '../lib/site';
import web3_img from '../assets/web3.svg';
import RiskDisclaimer from '../components/RiskDisclaimer';
const PreFooter = (param) => {

    return (
        <>

        { param?.hideDisclaimer ? (
            <></>
        ) : (
            <RiskDisclaimer />
        )}

        <section className="w-full max-w-screen-lg mb-10 mx-auto">

            <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4 gap-8">
                <div>
                    <div className="w-full flex items-center space-x-3 mb-4">
                        <h4 className="text-md font-medium">{loadConfig.WEB3_CONTRACT_NAME}</h4>
                    </div>
                    <ul className="flex flex-wrap items-center justify-start gap-4">
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

                    <p className="mx-auto text-xs text-gray-500 mt-4">
                        &copy; {new Date().getFullYear()} PIGMIL. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col text-start md:text-end">
                    <span className="text-gray-500 text-sm">Powered by</span>
                    <img alt="web3" width={100} height={100} className="me-auto md:me-0 md:ms-auto h-12 w-auto filter !invert opacity-75 premium-icon-glow pointer-events-none" src={web3_img} />
                </div>
            </div>
        </section>
        </>
)
}

export default PreFooter;