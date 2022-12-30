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
            <div className='grid grid-cols-1 lg:grid-cols-3 min-h-screen w-11/12 mx-auto'>
                <div className=''>
                    <LeftSite></LeftSite>
                </div>
                <div className=''>
                    <Outlet></Outlet>
                </div>
                <div className=''>
                    <RightSide></RightSide>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;