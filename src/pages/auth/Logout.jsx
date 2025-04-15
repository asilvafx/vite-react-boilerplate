import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Logout = () => {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Only attempt logout if user is authenticated
                if (isAuthenticated) {
                    await logout();
                    toast.success('Logged out successfully');
                }
                // Always redirect to login page
                navigate('/login', { replace: true });
            } catch (error) {
                console.error('Logout error:', error);
                toast.error('Error logging out');
                navigate('/');
            }
        };

        performLogout();
    }, [logout, navigate, isAuthenticated]);

    // Show nothing while logging out
    return null;
};

export default Logout;