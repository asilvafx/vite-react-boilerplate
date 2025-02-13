// Cart.jsx
import React from 'react';
import { useCart } from 'react-use-cart';

const Cart = ({ onClose }) => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    if (isEmpty) return (
        <>
            <div className="offcanvas">
                <button onClick={onClose} className="close-button">✖</button>
                {/* Close button */}
                <h1 className="mb-8">Cart</h1>
                <div>Your cart is empty</div>
            </div>
        </>
    );

    return (
        <div className="offcanvas">
            <button onClick={onClose} className="close-button">✖</button> {/* Close button */}
            <h1 className="mb-8">Cart ({totalUniqueItems})</h1>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                        <span className="text-truncate">{item.quantity} x {item.title}</span>
                        <button className="px-3 py-1" onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}>-</button>
                        <button className="px-3 py-1" onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}>+</button>
                        <button className="px-3 py-1" onClick={() => removeItem(item.id)}>&times;</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;