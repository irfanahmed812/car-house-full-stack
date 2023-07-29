import React, { useContext } from 'react';
import { AuthContext } from '../../Components/Context/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();

    // loading
    if (loading) {
        return <Loading></Loading>
    }

    // user
    if (user && user?.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;