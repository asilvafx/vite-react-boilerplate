import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from 'react-use-cart';
import { FaCheck, FaDownload } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import DBService from "../../data/rest.db.js";
import { generatePDF } from '../../utils/generatePDF';

const PaymentSuccess = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { emptyCart } = useCart();
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            const encoded = id;
            if (!encoded) {
                setError('Order not found');
                return;
            }
            const uid = atob(encoded);
            try {
                const results = await DBService.readBy('uid', uid, 'orders');
                if (results) {
                    setOrderDetails({
                        orderId: results.uid,
                        paymentIntentId: results.tx,
                        email: results.cst_email,
                        items: JSON.parse(results.items),
                        total: results.amount,
                        order: results
                    });
                    emptyCart();
                } else {
                    setError('Order not found');
                }
            } catch (e) {
                setError('Error fetching order: ' + e);
            }
        };
        fetchOrder();
    }, [location.search, emptyCart]);

    const handleContinue = () => navigate('/');
    const handleView = () => navigate('/orders');

    return (
        <div className="w-full max-w-3xl mx-auto mt-32 p-8 flex flex-col gap-6 bg-neutral-700 rounded-lg shadow-xl text-center">

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mx-auto w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl"
            >
                <FaCheck />
            </motion.div>

            <h1 className="text-3xl text-primary font-bold mb-2">{t('payment_seo_title')}</h1>
            <p className="text-xl text-gray-500 mb-4">{t('payment_sub_title')}</p>

            {error ? (
                <>
                    <p className="text-red-600 font-bold my-6">{error}</p>
                    <div className="flex flex-col items-center gap-4 mt-10">
                        <button onClick={handleContinue} className="px-6 py-3">
                            {t('payment_continue')}
                        </button>
                    </div>
                </>
            ) : orderDetails && (
                <>
                    <div className="bg-neutral-800 rounded-lg p-6 shadow-md text-left">
                        <p className="text-lg text-gray-800 mb-2">{t('payment_order_number')}: {orderDetails.orderId}</p>
                        <p className="text-md text-gray-500 mb-4">{t('payment_order_email')}: {orderDetails.email}</p>
                        <p className="text-xl font-semibold mb-4">{t('payment_order_summary')}</p>

                        <div className="mt-6 flex flex-col gap-4">
                            {orderDetails.items.map((item, i) => (
                                <div key={i} className="flex justify-between py-2 border-b last:border-b-0">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2">{item.quantity}x</span>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between py-4 mt-4 font-bold text-lg">
                                <span>{t('checkout_total')}:</span>
                                <span>€{parseFloat(orderDetails.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 mt-10">
                        <button onClick={handleContinue} className="px-6 py-3">
                            {t('payment_continue')}
                        </button>
                        <button onClick={handleView} className="bg-blue-600 text-white px-6 py-3">
                            {t('payment_view_orders')}
                        </button>
                        <button onClick={() => generatePDF(orderDetails.order)} className="px-6 py-3 mt-6">
                            <FaDownload /> {t('payment_receipt')}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentSuccess;
