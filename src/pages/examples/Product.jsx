// Product.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';

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

const Product = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Decode the product ID
    const decodedId = atob(productId);
    const product = products.find(p => p.id === parseInt(decodedId));

    if (!product) {
        return (
            <>
            <Header />
            <div>
                <h1>{t('product_not_found')}</h1>
                <button onClick={() => navigate('/shop')}>{t('back_to_shop')}</button>
            </div>
            </>
        );
    }

    return (
        <>
        <Header />
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Sale Price: ${product.sale_price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            <p>Tags: {product.tags.join(', ')}</p>
        </div>
        </>
    );
};

export default Product;