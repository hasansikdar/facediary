import React from 'react';
import PostBox from '../../Components/PostBox/PostBox';
import Posts from '../Posts/Posts';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import HomePosts from '../Shared/HomePosts/HomePosts';
import LeftSite from '../Shared/LeftSite/LeftSite';
import RightSide from '../Shared/RIghtSite/RightSide';

const Home = () => {
    return (
        <div className=''>
            {/* <Header></Header> */}
            <div className='lg:flex mt-10   w-11/12 mx-auto'>
                <div className='lg:w-1/2'>
                    <LeftSite></LeftSite>
                </div>
                <div className='w-full md:overflow-scroll lg:max-h-screen media'>
                    <PostBox></PostBox>
                    <HomePosts></HomePosts>
                </div>
                <div className='lg:w-1/2'>
                    <RightSide></RightSide>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Home;