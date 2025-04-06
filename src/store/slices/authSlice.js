import { createSlice } from '@reduxjs/toolkit';

// Sample users data with isAdmin flag
const sampleUsers = [
    { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe', isAdmin: false },
    { id: 2, email: 'admin@example.com', password: 'admin123', name: 'Admin User', isAdmin: true }
];

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
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
    }
});

// Async thunk for login
export const loginUser = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user in sample data
        const user = sampleUsers.find(u =>
            u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Create a sample token
        const token = btoa(`${user.email}:${Date.now()}`);

        // Remove sensitive data before storing in state
        const userWithoutPassword = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
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

// Export reducer
export default authSlice.reducer;
