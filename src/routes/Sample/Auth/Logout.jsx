import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/");
    }, [dispatch, navigate]);

    return null; // or <p>Logging out...</p> if you want a message
};

export default Logout;
