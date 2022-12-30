import React, { useContext } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layoute/Main';
import Home from '../Pages/Home/Home';
import Media from '../Pages/Media/Media';
import Join from '../Pages/Join/Join';
import Login from '../Pages/Login/Login';
import About from '../Pages/About/About';
import Profile from '../Pages/Profile/Profile';
import Message from '../Pages/Message/Message';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PostDetails from '../Pages/PostDetails/PostDetails';
import { AuthContext } from '../UserContext/UserContext';

const Routers = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute><Main></Main></PrivateRoute>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/message',
                element: <Message></Message>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/postdetails/:id',
                element: <PostDetails></PostDetails>,
                loader: ({ params }) => fetch(`https://facediary.vercel.app/posts/${params.id}`)
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
    },
    
    


])

export default Routers;