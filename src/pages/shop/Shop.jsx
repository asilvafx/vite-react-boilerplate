import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { useCatalog } from '../../hooks/useCatalog';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';

const Shop = () => {
    const { products, loading, error } = useCatalog();
    const { addItem, emptyCart, setItems } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        toast.success(`${product.name} added to cart!`);
    };

    const handleBuyNow = (product) => {
        // Clear the cart first
        emptyCart();

        // Add only this product
        setItems([{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        }]);

        // Navigate to checkout
        navigate('/checkout');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Helmet>
                <title>Shop</title>
            </Helmet>

            <Header />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Shop</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold">${product.price}</span>
                                    <span className="text-sm text-gray-500">In stock: {product.stock}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(product)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Shop;
