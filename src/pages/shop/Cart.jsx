import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';

const Cart = () => {
    const navigate = useNavigate();
    const {
        isEmpty,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (isEmpty) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                    <p>Your cart is empty</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>

            <Header />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 shadow">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">${item.price}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="ml-4 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-2"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={() => {
                                    emptyCart();
                                    toast.success('Cart cleared');
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Cart;
