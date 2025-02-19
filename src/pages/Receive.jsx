import React, { useState } from 'react';
import { Copy, Wallet, QrCode, Share2, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import Header from "../components/Header";
import GoBack from "../components/GoBack";
import AppFooter from "../components/AppFooter";
import {getUserData} from "../lib/user";
import { shortenAddress } from '../lib/utils';

const Receive = () => {

    const userData = getUserData();

    // Mock wallet address - replace with actual wallet integration
    const walletAddress = shortenAddress(userData?.web3_address);
    const fullWalletAddress = userData?.web3_address;

    const [showFullAddress, setShowFullAddress] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fullWalletAddress);
        toast.success('Wallet address copied to clipboard', {
            icon: <Copy className="w-4 h-4 text-emerald-400" />,
            duration: 2000,
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Wallet Address',
                    text: fullWalletAddress,
                });
            } catch (error) {
                console.warn('Error sharing:', error);
            }
        } else {
            copyToClipboard();
        }
    };

    const downloadQR = () => {
        const svg = document.querySelector('#wallet-qr');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = 'wallet-qr.png';
                downloadLink.href = pngFile;
                downloadLink.click();
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
    };


    return (
        <>
        <section className="w-full max-w-screen-lg mx-auto my-10">
            <Header />

            <div className="flex items-center justify-start gap-4 mb-8">

                <GoBack url="/dashboard"/>
                <h1 className="text-3xl font-bold neon-text">Receive Crypto</h1>

            </div>

            <div className="premium-panel p-8 rounded-xl">

                <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Wallet className="w-6 h-6 premium-icon"/>
                    </div>
                    <h1 className="text-2xl font-medium">Receive Tokens</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mb-10">

                    {/* QR Code Section */}
                    <div className="w-full flex flex-col items-center mb-8">
                        <div className="premium-panel p-6 rounded-xl mb-4 mx-auto">
                            <QRCodeSVG
                                id="wallet-qr"
                                value={fullWalletAddress}
                                size={200}
                                level="H"
                                includeMargin={true}
                                className="w-48 h-48"
                            />
                        </div>
                        <div className="w-10/12 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
                            <button onClick={downloadQR} className="w-full cyber-button flex items-center justify-center">
                                <Download className="w-4 h-4 mr-2"/>
                                Save QR
                            </button>
                            <button onClick={handleShare} className="w-full cyber-button flex items-center justify-center">
                                <Share2 className="w-4 h-4 mr-2"/>
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Wallet Address Section */}
                    <div className="space-y-4">
                        <div className="premium-panel p-4 rounded-lg mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                                    <p className="font-medium font-mono">
                                        {showFullAddress ? fullWalletAddress : walletAddress}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setShowFullAddress(!showFullAddress)}
                                        className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        <QrCode className="w-5 h-5"/>
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        <Copy className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Network Info */}
                        <div className="premium-panel p-4 rounded-lg bg-cyan-500/5">
                            <p className="text-sm text-gray-400 mb-2">Supported Networks</p>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-400"/>
                                    <span className="text-gray-300">Polygon Network (MATIC)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400"/>
                                    <span className="text-gray-300">BOLT Token</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                {/* Important Notice */}
                <div className="premium-panel p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                    <p className="text-sm text-yellow-400">Important</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Only send MATIC or BOLT tokens to this address. Sending other tokens may result in permanent
                        loss.
                    </p>
                </div>

            </div>

        </section>
            <AppFooter/>
        </>
    );
};

export default Receive;