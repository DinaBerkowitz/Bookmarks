
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthContextComponent = ({ children }) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('api/bookmark/getcurrentuser')
            setUser(data)
        }
        loadUser();

    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);
export {AuthContextComponent,useAuth};