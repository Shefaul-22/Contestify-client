import React from 'react';

import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {

    const { user, loading } = UseAuth();

    const location = useLocation();
    // console.log('location', location);



    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }



    return children;
};

export default PrivateRoute;