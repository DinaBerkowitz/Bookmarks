

import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    useEffect(() => {
        const shouldLogout = async () => {
            await axios.post('/api/bookmark/logout');
            setUser(null);
            navigate('/');
        }
        shouldLogout();
    }, []);

    return (<>
    </>);
}

export default Logout;