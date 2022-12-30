import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';
import LeftSite from '../Pages/Shared/LeftSite/LeftSite';
import RightSide from '../Pages/Shared/RIghtSite/RightSide';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;