import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthProtected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const authStatus = useSelector(state => state.Auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoad(false);
    }, [navigate, authStatus, authentication]);

    if (load) {
        return <div>Loading...</div>; // You can show a loading spinner or similar UI here
    }

    return <>{children}</>;
}

export default AuthProtected;
