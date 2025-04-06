import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                toast.success('Logged out successfully');
                navigate('/login');
            } catch (error) {
                toast.error('Error logging out');
                navigate('/');
            }
        };

        performLogout();
    }, [logout, navigate]);

    return null;
};

export default Logout;
