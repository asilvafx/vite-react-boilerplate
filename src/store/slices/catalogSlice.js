import { createSlice } from '@reduxjs/toolkit';

// Sample products data
const sampleProducts = [
    {
        id: 1,
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        image: 'https://via.placeholder.com/200',
        category: 'electronics',
        stock: 10
    },
    {
        id: 2,
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: 299.99,
        image: 'https://via.placeholder.com/200',
        category: 'electronics',
        stock: 15
    },
    {
        id: 3,
        name: 'Laptop Backpack',
        description: 'Durable laptop backpack with multiple compartments',
        price: 49.99,
        image: 'https://via.placeholder.com/200',
        category: 'accessories',
        stock: 20
    },
    {
        id: 4,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life',
        price: 29.99,
        image: 'https://via.placeholder.com/200',
        category: 'electronics',
        stock: 30
    }
];

const initialState = {
    products: sampleProducts,
    loading: false,
    error: null,
    filters: {
        category: null,
        priceRange: { min: 0, max: Infinity }
    }
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        }
    }
});

// Selectors
export const selectAllProducts = (state) => state.catalog.products;
export const selectLoading = (state) => state.catalog.loading;
export const selectError = (state) => state.catalog.error;
export const selectFilters = (state) => state.catalog.filters;

// Export actions
export const { setLoading, setError, setFilters, clearFilters } = catalogSlice.actions;

export default catalogSlice.reducer;
