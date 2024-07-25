import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Signup from './Pages/Signup';
import AddBookmark from './Pages/AddBookmark';
import MyBookmarks from './Pages/MyBookmarks';


import { AuthContextComponent } from './AuthContext';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/addbookmark' element={<AddBookmark />} />
                    <Route path='/mybookmarks' element={<MyBookmarks />} />
                </Routes>
            </Layout>
        </AuthContextComponent>

    );
}

export default App;