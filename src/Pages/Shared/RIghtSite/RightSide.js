import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../UserContext/UserContext';

const RightSide = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className='mx-5'>
            <div className='profile  my-4 shadow-xl border text-center'>
                <img src="https://img.freepik.com/premium-vector/social-networks-set_578229-307.jpg?w=2000" alt="" />
            </div>
        </div>
    );
};

export default RightSide;