import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DBService from '../../data/rest.db';

// Async thunk to fetch catalog items from DB using DBService.getAll method.
export const fetchCatalog = createAsyncThunk(
    'catalog/fetchCatalog',
    async (_, { rejectWithValue }) => {
        try {
            const response = await DBService.getAll('catalog');
            // response is an object, so convert to an array
            return Object.values(response);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    products: [],
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
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCatalog.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchCatalog.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { setFilters, clearFilters } = catalogSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.catalog.products;
export const selectLoading = (state) => state.catalog.loading;
export const selectError = (state) => state.catalog.error;
export const selectFilters = (state) => state.catalog.filters;

export default catalogSlice.reducer;
