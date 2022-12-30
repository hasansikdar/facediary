import React from 'react';
import Posts from '../Posts/Posts';

const Media = () => {

    return (
        <div className='lg:w-2/5 mx-auto md:overflow-scroll lg:max-h-screen media'>
            <Posts></Posts>
        </div>
    );
};

export default Media;