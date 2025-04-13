import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFilters, clearFilters, fetchCatalog } from '../store/slices/catalogSlice';

export const useCatalog = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.catalog.products);
    const loading = useSelector((state) => state.catalog.loading);
    const error = useSelector((state) => state.catalog.error);
    const filters = useSelector((state) => state.catalog.filters);

    // Fetch catalog items on component mount.
    useEffect(() => {
        dispatch(fetchCatalog());
    }, [dispatch]);

    const filterProducts = () => {
        return products.filter(product => {
            if (filters.category && product.category !== filters.category) return false;
            if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
            return true;
        });
    };

    const updateFilters = (newFilters) => {
        dispatch(setFilters(newFilters));
    };

    const resetFilters = () => {
        dispatch(clearFilters());
    };

    return {
        products: filterProducts(),
        allProducts: products,
        loading,
        error,
        filters,
        updateFilters,
        resetFilters
    };
};

export default useCatalog;
