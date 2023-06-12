import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserToken } from '../../redux/token';

function PrivateRoute({ children }) {
    const token = getUserToken();
    const location = useLocation();
    console.log("token", token);
    if (token === null || token === "" || token === "null") {
        // console.log("token", token);
        return <Navigate
            to="/Login"
            replace={true}
            state={{
                return_url: location.pathname
            }}
        />
    }

    return children;
}

export default PrivateRoute