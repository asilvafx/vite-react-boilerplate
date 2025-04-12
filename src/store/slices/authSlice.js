import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import DBService from '../../data/rest.db';
import {decryptHash, encryptHash} from '../../lib/crypto';


const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

// Get user data from cookies
export const getUserData = async () => {
    try {
        const userData = Cookies.get('userData') || null;
        const isLoggedIn = Cookies.get('isLoggedIn');

        if (userData && isLoggedIn) {

            if(userData){
                const parsedUserData = JSON.parse(decryptHash(userData));

                return parsedUserData.user || {};

            }
        }
        console.error('Error fetching user');
        return {};
    } catch (error) {
        console.error('Error fetching user:', error);
        return {};
    }
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

        if (decryptHash(existingUser.password) !== credentials.password) {
            throw new Error('Invalid credentials');
        }

        // Create a token
        const token = btoa(`${existingUser.id}`);

        // Remove sensitive data before storing in state and cookies
        const userWithoutPassword = {
            user: existingUser,
            token: token
        };

        const userEncrypted = encryptHash(JSON.stringify(userWithoutPassword));

        // Set user data in cookies
        Cookies.set('userData', userEncrypted, {
            expires: 7,  // 7 days
            secure: true,
            sameSite: 'strict'
        });

        // Set authentication status in cookies
        Cookies.set('isLoggedIn', 'true', {
            expires: 7,  // 7 days
            secure: true,
            sameSite: 'strict'
        });

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
        // Remove all auth-related cookies with the same options used when setting them
        Cookies.remove('userData', {
            secure: true,
            sameSite: 'strict'
        });

        Cookies.remove('isLoggedIn', {
            secure: true,
            sameSite: 'strict'
        });

        // Clear redux state
        dispatch(logout());

        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Async thunk for checking auth status
export const checkAuthStatus = () => async (dispatch) => {
    try {
        const userData = Cookies.get('userData') || null;
        const isLoggedIn = Cookies.get('isLoggedIn');

        if (userData && isLoggedIn) {

            if(userData){
                const parsedUserData = JSON.parse(decryptHash(userData));

                const userToken = parsedUserData.token;
                const validToken = Number(atob(userToken)) === parsedUserData.user.id;

                if(validToken){
                    dispatch(loginSuccess({
                        user: parsedUserData,
                        token: userToken
                    }));
                    return true;
                } else {
                    dispatch(logout());
                    return false;
                }
            } else {
                dispatch(logout());
                return false;
            }
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
