import React from 'react';
import { Helmet } from "react-helmet-async";
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { motion } from 'framer-motion';

function Shop() {
    const { addItem, totalItems } = useCart();

    const items = [
        { id: 1, name: "Cool Tag", price: 9.99, image: "https://placehold.co/150" },
        { id: 2, name: "Collar + Tag", price: 14.99, image: "https://placehold.co/150" },
        { id: 3, name: "Bracelet Tag", price: 12.49, image: "https://placehold.co/150" },
    ];

    const addToCart = (e) => {
        addItem(e);
        toast.success(`${e.name} added to your cart.`)
    }

    return (
        <>
            <Helmet>
                <title>Shop</title>
            </Helmet>

            <motion.div
                className="p-4 w-screen max-w-2xl m-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="font-bold mb-4 w-full text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Shop
                </motion.h1>

                <div className="flex w-full justify-between mb-4">
                    <p>🛒 Items in Cart: <strong>{totalItems}</strong></p>
                    <Link to="/cart">
                        <p className="text-blue-500 hover:underline">View all</p>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map(item => (
                        <motion.div
                            key={item.id}
                            className="bg-white border rounded-lg p-4 flex flex-col items-center shadow-sm"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="mb-2 w-32 h-32 rounded-md object-cover"
                            />
                            <h2 className="text-lg font-semibold text-black">{item.name}</h2>
                            <p className="text-gray-600 mb-2">€{item.price}</p>
                            <motion.button
                                onClick={() => addToCart(item)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-black text-white rounded"
                            >
                                Add to Cart
                            </motion.button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
                </div>
            </motion.div>
        </>
    );
}

export default Shop;
