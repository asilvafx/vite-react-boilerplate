import React, {useEffect, useState} from 'react';
import { Helmet } from "react-helmet-async";
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../../components/Common/PaymentForm.jsx';

// Use Vite environment variables
const stripePromise = loadStripe(process.env.STRIPE_API);

function Checkout() {
    const { cartTotal, items, totalItems, emptyCart} = useCart();
    const [stripeOptions, setStripeOptions] = useState(null);
    const [shippingCost] = useState(5.99);
    const [status, setStatus] = useState(null); // null | 'success' | 'failed'

    const totalPrice = (cartTotal + shippingCost).toFixed(2);

    useEffect(() => {
        // Set up Stripe options when cart total changes
        setStripeOptions({
            mode: 'payment',
            amount: Math.round(totalPrice * 100), // Convert to cents
            currency: 'eur',
            appearance: {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#6772e5',
                    colorBackground: '#ffffff',
                    colorText: '#30313d',
                    colorDanger: '#df1b41',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    borderRadius: '0.6rem',
                },
            },
            // Make sure we're using automatic payment methods
            payment_method_types: ['card'],
            automatic_payment_methods: {
                enabled: true,
            },
        });
    }, [cartTotal]);

    return (
        <>
            <Helmet>
                <title>Checkout</title>
            </Helmet>

            <div className="p-4 w-full max-w-2xl m-auto">
                <h1 className="font-bold mb-6 text-center">Checkout</h1>

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-green-100 border border-green-400 text-green-700 p-4 rounded text-center mb-6"
                        >
                            ✅ Payment successful! Thank you for your order.
                        </motion.div>
                    )}
                    {status === 'failed' && (
                        <motion.div
                            key="failed"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="bg-red-100 border border-red-400 text-red-700 p-4 rounded text-center mb-6"
                        >
                            ❌ Payment failed. Please try again or use another method.
                        </motion.div>
                    )}
                </AnimatePresence>

                {totalItems === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    <motion.div
                        className="grid md:grid-cols-2 gap-6"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.1}}
                    >
                        {/* Left: Form */}
                        <motion.div
                            className="space-y-6"
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3}}
                        >
                        {stripeOptions && (
                            <Elements stripe={stripePromise} options={stripeOptions}>
                                <PaymentForm cartTotal={totalPrice} />
                            </Elements>
                        )}
                        </motion.div>

                        {/* Right: Summary */}
                        <motion.div
                            className="flex flex-col p-6"
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3}}
                        >
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <ul className="space-y-2 mb-4">
                                {items.map(item => (
                                    <li key={item.id} className="flex justify-between text-sm">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t pt-4 space-y-2 text-sm mt-10">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>€{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Shipping</span>
                                    <span>€{shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                    <span>Total</span>
                                    <span>€{totalPrice}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                <div className="mt-6 text-center">
                    <Link to="/cart" className="text-blue-500 hover:underline">← Back to Cart</Link>
                </div>
            </div>
        </>
    );
}

export default Checkout;
