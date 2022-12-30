import React from 'react';
import PostBox from '../../Components/PostBox/PostBox';
import Posts from '../Posts/Posts';

const Home = () => {
    return (
        <div className='mx-2 md:overflow-scroll max-h-screen'>
            <PostBox></PostBox>
            <div className='my-10 '>
                <Posts></Posts>
            </div>
        </div>
    );
};

export default Home;