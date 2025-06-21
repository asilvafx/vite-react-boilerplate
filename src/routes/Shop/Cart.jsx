import React from 'react';
import { Helmet } from "react-helmet-async";
import { useCart } from 'react-use-cart';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
    const navigate = useNavigate();
    const { items, removeItem, totalItems, cartTotal, emptyCart, updateItemQuantity } = useCart();

    const checkoutCart = () => {
        navigate("/checkout");
    };

    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>

            <div className="p-4 w-screen max-w-2xl m-auto">
                <h1 className="font-bold mb-4 text-center">🛒 Your Cart</h1>
                {totalItems === 0 ? (
                        <motion.p
                            initial={{opacity: 0.3}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.1}}
                            className="font-bold mb-2 mt-6 text-center"
                        >
                            Your cart is empty
                        </motion.p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            <AnimatePresence>
                                {items.map(item => (
                                    <motion.li
                                        key={item.id}
                                        layout
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, scale: 0.9}}
                                        transition={{duration: 0.3}}
                                        className="border p-4 flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-400">€{item.price}</p>
                                        </div>
                                        <div className="text-sm text-gray-400 flex items-center gap-2 ms-auto me-4">
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>

                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.2}}
                            className="font-bold mb-2 mt-6 text-center"
                        >
                            Total: €{cartTotal.toFixed(2)}
                        </motion.p>

                        <div className="mt-4 text-center flex items-center justify-center gap-2">
                            <button
                                onClick={() => emptyCart()}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Empty Cart
                            </button>
                            <motion.button
                                whileTap={{scale: 0.95}}
                                whileHover={{scale: 1.05}}
                                onClick={() => checkoutCart()}
                                className="bg-white text-black px-4 py-2 rounded border"
                            >
                                Checkout
                            </motion.button>
                        </div>
                    </>
                )}

                <div className="mt-6 text-center">
                    <Link to="/shop" className="text-blue-500 hover:underline">← Back to Shop</Link>
                </div>
            </div>
        </>
    );
}

export default Cart;
