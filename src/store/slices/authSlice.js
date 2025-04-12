import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DBService from '../../data/rest.db';
import {decryptHash} from '../../lib/crypto';

// Get users from database
const getUsers = async () => {
    try {
        const users = await DBService.getAll('users');
        return users || {};
    } catch (error) {
        console.error('Error fetching users:', error);
        return {};
    }
};

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

// Create async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            // Check if user already exists
            const existingUser = await DBService.getItemByKeyValue('email', userData.email, 'users');

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Create user in database
            const result = await DBService.create(userData, 'users');

            if (!result || !result.key) {
                throw new Error('Failed to create user account');
            }

            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for login
export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());

        // Get user from database
        const existingUser = await DBService.getItemByKeyValue('email', credentials.email, 'users');

        if (!existingUser) {
            throw new Error('Invalid credentials');
        }

        if ( decryptHash(existingUser.password) !== credentials.password) {
            throw new Error('Invalid credentials');
        }

        // Create a sample token
        const token = btoa(`${credentials.email}:${Date.now()}`);

        // Remove sensitive data before storing in state
        const userWithoutPassword = {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            isAdmin: existingUser.isAdmin
        };

        dispatch(loginSuccess({ user: userWithoutPassword, token }));
        return { success: true };
    } catch (error) {
        dispatch(loginFailure(error.message));
        throw error;
    }
};

// Async thunk for logout
export const logoutUser = () => async (dispatch) => {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        dispatch(logout());
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Async thunk for checking auth status
export const checkAuthStatus = () => async (dispatch, getState) => {
    try {
        const { auth } = getState();

        if (auth.token && auth.user) {
            // Validate token here if needed
            return true;
        }

        dispatch(logout());
        return false;
    } catch (error) {
        dispatch(logout());
        return false;
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.user?.isAdmin || false;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Export actions
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    clearError,
    setLoading
} = authSlice.actions;

export default authSlice.reducer;
