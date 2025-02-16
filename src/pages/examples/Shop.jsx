import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useCart } from 'react-use-cart';
import { IoEye } from "react-icons/io5";
import { Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        title: "Product 1",
        description: "Description for Product 1",
        price: 29.99,
        sale_price: 24.99,
        stock: 10,
        category: "Category 1",
        tags: ["tag1", "tag2"],
        image: "https://placehold.co/600"
    },
    {
        id: 2,
        title: "Product 2",
        description: "Description for Product 2",
        price: 39.99,
        sale_price: 34.99,
        stock: 5,
        category: "Category 2",
        tags: ["tag3", "tag4"],
        image: "https://placehold.co/600"
    },
    {
        id: 3,
        title: "Product 3",
        description: "Description for Product 3",
        price: 49.99,
        sale_price: 44.99,
        stock: 0,
        category: "Category 3",
        tags: ["tag5", "tag6"],
        image: "https://placehold.co/600"
    },
];

const Shop = () => {
    const { t } = useTranslation();
    const { addItem } = useCart();
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <>
            <Header/>
            <div className="flex justify-center items-center h-screen">Loading...</div>
            </>
        ); // Loading component
    }

    return (
        <>
            <Helmet>
                <title>{t('seo_title')}</title>
                <meta name='description' content={t('seo_description')}/>
            </Helmet>
            <Header/>
            <section className="text-center py-20 px-4">

                <h1 className="text-5xl md:text-7xl font-bold text-neon-blue">
                    {t('shop_title')}
                </h1>
                <h2 className="text-2xl md:text-3xl mt-4">
                    {t('shop_description')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-20">
                    {products.map(product => (
                        <div key={product.id} className="product-card mb-4">
                            <Link to={`/products/${btoa(product.id)}`}> {/* Link to product page */}
                                <img src={product.image} alt={product.title} />
                            </Link>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)} <span className="line-through">${product.sale_price.toFixed(2)}</span></p>
                            <div className="w-full flex gap-2 items-center justify-between">
                                <button className="w-2/3" onClick={() => addItem(product)}>Add to Cart</button>
                                <Link
                                    to={`/products/${btoa(product.id)}`}
                                    className="w-1/3"
                                >
                                    <button className="w-full">
                                        <IoEye className="size-6 mx-auto" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Shop;