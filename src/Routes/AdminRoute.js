import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Spinner from "../Pages/Shared/Spinner/Spinner";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const {isAdmin, isAdminLoading} = useAdmin(user?.email);
    const location = useLocation();

    // if firebase onAuthStateChange promise in progress
    if (loading || isAdminLoading) {
        return <Spinner />;
    } 

    if (!isAdmin) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;

};

export default AdminRoute;
