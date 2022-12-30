import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../UserContext/UserContext';

const RightSide = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className='mx-5'>
            <div className='profile  my-4 shadow-xl border text-center'>
                <iframe className='rounded-xl' width="100%" height="315" src="https://www.youtube.com/embed/EFUD2MulXY0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    );
};

export default RightSide;