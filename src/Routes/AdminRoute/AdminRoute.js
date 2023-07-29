import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import { AuthContext } from '../../Components/Context/AuthProvider/AuthProvider';
import Loading from '../../Components/Loading/Loading';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();

    // loading
    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }

    // user
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/dashboard' state={{ from: location }} replace ></Navigate>

};

export default AdminRoute;