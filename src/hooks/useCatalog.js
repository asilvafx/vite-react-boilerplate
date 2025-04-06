import { useSelector, useDispatch } from 'react-redux';
import {
    selectAllProducts,
    selectLoading,
    selectError,
    selectFilters,
    setFilters,
    clearFilters
} from '../store/slices/catalogSlice';

export const useCatalog = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const filters = useSelector(selectFilters);

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
