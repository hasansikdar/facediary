import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../UserContext/UserContext';

const LeftSite = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='mx-5 rounded-xl'>
            <div className='profile my-4 shadow-xl border text-center'>
                <img className='w-20 h-20 mx-auto my-4 rounded-full' src={user?.photoURL} alt="" />
                <div className='mb-5'>
                    <h3 className='hover:link hover:text-blue-500 text-2xl'><Link to='/profile'>{user?.displayName}</Link></h3>
                    <span>{user?.email}</span>
                </div>
            </div>
        </div>
    );
};

export default LeftSite;