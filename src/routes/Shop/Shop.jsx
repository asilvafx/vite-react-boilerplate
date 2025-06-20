import React from 'react';
import { Helmet } from "react-helmet-async";
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';

function Shop() {
    const { addItem, totalItems } = useCart();

    const items = [
        { id: 1, name: "Cool Tag", price: 9.99, image: "https://placehold.co/150" },
        { id: 2, name: "Collar + Tag", price: 14.99, image: "https://placehold.co/150" },
        { id: 3, name: "Bracelet Tag", price: 12.49, image: "https://placehold.co/150" },
    ];

    return (
        <>
            <Helmet>
                <title>Shop</title>
            </Helmet>

            <div className="p-4 w-screen max-w-2xl m-auto">
                <h1 className="font-bold mb-4 w-full text-center">Shop</h1>
                <div
                    className="flex w-full justify-between"
                >
                    <p className="mb-4">🛒 Items in Cart: <strong>{totalItems}</strong></p>
                    <Link
                        to="/cart"
                    >
                        <p>View all</p>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map(item => (
                        <div key={item.id} className="border rounded p-4 flex flex-col items-center">
                            <img src={item.image} alt={item.name} className="mb-2 w-32 h-32 object-cover"/>
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="text-gray-300 mb-2">€{item.price}</p>
                            <button
                                onClick={() => addItem(item)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
                </div>
            </div>
        </>
    );
}

export default Shop;
