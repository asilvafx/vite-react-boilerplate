import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {X, QrCode, Camera, Copy} from 'lucide-react';
import {shortenAddress} from "../lib/utils";
import copyToClipboard from '../components/CopyToClipboard';

const QRModal = ({ isOpen, onClose, walletAddress }) => {
    const [activeTab, setActiveTab] = useState('code');
    const [scannedResult, setScannedResult] = useState(null);
    const [scanner, setScanner] = useState(null);

    useEffect(() => {
        if (isOpen && activeTab === 'scan') {
            const newScanner = new Html5QrcodeScanner(
                "qr-reader",
                {
                    fps: 10,
                    qrbox: { width: 200, height: 200 },
                    rememberLastUsedCamera: true,
                },
                false
            );

            setScanner(newScanner);

            newScanner.render(
                (decodedText) => {
                    console.log('Scanned QR Code:', decodedText);
                    setScannedResult(decodedText);
                    newScanner.pause();
                },
                (error) => {
                    console.error('QR Scan error:', error);
                }
            );

            return () => {
                if (newScanner) {
                    try {
                        newScanner.clear();
                    } catch (error) {
                        console.error('Error clearing scanner:', error);
                    }
                }
            };
        }

        return () => {
            if (scanner) {
                try {
                    scanner.clear();
                } catch (error) {
                    console.error('Error clearing scanner:', error);
                }
            }
        };
    }, [isOpen, activeTab]);

    const handleClose = () => {
        if (scanner) {
            try {
                scanner.clear();
            } catch (error) {
                console.error('Error clearing scanner:', error);
            }
        }
        setScannedResult(null);
        setActiveTab('code');
        onClose();
    };

    const handleTabChange = (tab) => {
        if (scanner) {
            try {
                scanner.clear();
            } catch (error) {
                console.error('Error clearing scanner:', error);
            }
        }
        setScannedResult(null);
        setActiveTab(tab);
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div
                className="premium-panel p-6 rounded-xl w-[360px] mx-4 relative"
                style={{ maxHeight: 'calc(100vh - 2rem)' }}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>

                <div className="text-center mb-6">
                    <h2 className="text-xl font-medium neon-text">QR Code Scanner</h2>
                    <p className="text-sm text-gray-400 mt-1">Scan or share your wallet address</p>
                </div>

                <div className="flex space-x-2 mb-6">
                    <button
                        onClick={() => handleTabChange('code')}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'code'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        My Code
                    </button>
                    <button
                        onClick={() => handleTabChange('scan')}
                        className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                            activeTab === 'scan'
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Scan
                    </button>
                </div>

                <div className="flex flex-col items-center overflow-hidden">
                    {activeTab === 'code' ? (
                        <div className="premium-panel p-4 rounded-xl ">
                            <QRCodeSVG
                                value={walletAddress}
                                size={200}
                                level="H"
                                includeMargin={true}
                            />
                            <div className="w-full premium-panel flex items-center justify-between mt-4 p-2 gap-2">
                                <p>{shortenAddress(walletAddress)}</p>
                                <button
                                    onClick={() => copyToClipboard(walletAddress, 'Wallet address copied to clipboard')}
                                    className="text-cyan-400 hover:text-cyan-300 p-1 transition-colors"
                                >
                                    <Copy className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div id="qr-reader" className="premium-panel rounded-xl overflow-hidden"/>
                            {scannedResult && (
                                <div className="mt-4 p-4 premium-panel rounded-lg">
                                <p className="text-sm text-gray-400">Scanned Address:</p>
                                    <p className="font-mono text-sm text-cyan-400 break-all">{scannedResult}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRModal;