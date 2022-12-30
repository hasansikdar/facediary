import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layoute/Main';
import Home from '../Pages/Home/Home';
import Jobs from '../Pages/Jobs/Jobs';
import Join from '../Pages/Join/Join';
import Login from '../Pages/Login/Login';
import Mynetwork from '../Pages/Mynetwork/Mynetwork';
import Profile from '../Pages/Profile/Profile';

const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/mynetwork',
                element: <Mynetwork></Mynetwork>
            },
            {
                path: '/jobs',
                element: <Jobs></Jobs>
            }
        ]
    },
    {
        path: '/join',
        element: <Join></Join>
    },
    {
        path: '/login',
        element: <Login></Login>
    }
    
])

export default Routers;