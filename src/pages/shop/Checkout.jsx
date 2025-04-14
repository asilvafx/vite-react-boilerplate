import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import toast from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, cartTotal, emptyCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: ''
    });

    // Check if cart is empty and redirect
    useEffect(() => {
        if (items.length === 0) {
            toast.error('No items in cart');
            navigate('/shop');
        }
    }, [items, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear cart after successful checkout
            emptyCart();

            // Show success message
            toast.success('Order placed successfully!');

            // Redirect to success page or home
            navigate('/');
        } catch (error) {
            toast.error('Error processing payment');
        } finally {
            setIsProcessing(false);
        }
    };

    // If cart is empty, return null (useEffect will handle redirect)
    if (items.length === 0) return null;

    return (
        <>
            <Helmet>
                <title>Checkout</title>
            </Helmet>

            <Header />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Rest of your existing JSX code remains exactly the same */}
                    {/* Checkout Form */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Street Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                required
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">ZIP Code</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                required
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                required
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            required
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                required
                                                value={formData.cardExpiry}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">CVC</label>
                                            <input
                                                type="text"
                                                name="cardCVC"
                                                required
                                                value={formData.cardCVC}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full py-3 px-4 text-white rounded-lg ${
                                    isProcessing
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Checkout;
