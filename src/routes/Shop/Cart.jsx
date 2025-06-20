import React from 'react';
import { Helmet } from "react-helmet-async";
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';

function Cart() {
    const { items, removeItem, totalItems, cartTotal, emptyCart } = useCart();

    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>

            <div className="p-4 w-screen max-w-2xl m-auto">
                <h1 className="font-bold mb-4 text-center">🛒 Your Cart</h1>
                {totalItems === 0 ? (
                    <p className="text-center">Your cart is empty</p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {items.map(item => (
                                <li key={item.id} className="border p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-400">€{item.price} x {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 text-center">
                            <p className="font-bold mb-2">Total: €{cartTotal.toFixed(2)}</p>
                            <button
                                onClick={() => emptyCart()}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Empty Cart
                            </button>
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
