import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser as logoutAction } from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const login = async (credentials) => {
        await dispatch(loginUser(credentials));
    };

    const logout = async () => {
        await dispatch(logoutAction());
    };

    return {
        user: auth.user,
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
        error: auth.error,
        login,
        logout
    };
};

export default useAuth;
