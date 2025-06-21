import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Checkout() {
    const { items, cartTotal, totalItems, emptyCart } = useCart();
    const [shippingCost] = useState(5.99);
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [status, setStatus] = useState(null); // null | 'success' | 'failed'
    const [loading, setLoading] = useState(false);

    const PaymentSuccess = () => {
        setStatus('success');
        emptyCart();
    }
    const PaymentFail = () => {
        setStatus('failed');
    }
    const handleOrder = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        setTimeout(() => {
            const random = Math.random();
            if (random < 0.8) {
                PaymentSuccess();
            } else {
                PaymentFail();
            }
            setLoading(false);
        }, 2000); // simulate 2s payment process
    };

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
                        <motion.form
                            className="space-y-6"
                            onSubmit={handleOrder}
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3}}
                        >
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
                                <input type="text" placeholder="Full Name" required
                                       className="w-full p-2 border rounded mb-2"/>
                                <input type="email" placeholder="Email" required
                                       className="w-full p-2 border rounded mb-2"/>
                                <input type="tel" placeholder="Phone" required className="w-full p-2 border rounded"/>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
                                <input type="text" placeholder="Street Address" required
                                       className="w-full p-2 border rounded mb-2"/>
                                <input type="text" placeholder="City" required
                                       className="w-full p-2 border rounded mb-2"/>
                                <div className="flex gap-2">
                                    <input type="text" placeholder="ZIP Code" required
                                           className="w-full p-2 border rounded"/>
                                    <input type="text" placeholder="Country" required
                                           className="w-full p-2 border rounded"/>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="credit">Credit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="bank">Bank Transfer</option>
                                </select>
                            </div>

                            <motion.button
                                type="submit"
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.02}}
                                disabled={loading}
                                className="bg-black text-white w-full py-2 rounded hover:bg-gray-900 transition disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Confirm Order'}
                            </motion.button>
                        </motion.form>

                        {/* Right: Summary */}
                        <motion.div
                            className="bg-neutral-100 flex flex-col p-6 rounded-lg"
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3}}
                        >
                            <h2 className="text-black text-lg font-semibold mb-4">Order Summary</h2>
                            <ul className="space-y-2 mb-4">
                                {items.map(item => (
                                    <li key={item.id} className="flex justify-between text-black text-sm">
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t pt-4 space-y-2 text-sm mt-auto">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-black">€{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="text-black">€{shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-black border-t pt-2">
                                    <span>Total</span>
                                    <span>€{(cartTotal + shippingCost).toFixed(2)}</span>
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
