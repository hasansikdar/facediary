import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit,FaRegTrashAlt } from "react-icons/fa";
const Comment = ({cm,DeleteComment}) => {
    const {userPhoto,comment, userName, _id} = cm;
    return (
        <div className='border p-3 border my-2 flex'>
            <img className='w-10 h-10 rounded-full mr-2' src={userPhoto} alt="" />
            <div className='comment'>
                <Link className='hover:link text-blue-500' to='/profile'>{userName}</Link>
                <p>{comment}</p>
            </div>
            <div className='ml-auto'>
                <button className='btn btn-sm mx-2'><FaEdit className=''></FaEdit></button>
                <button onClick={() => DeleteComment(_id)} className='btn btn-sm mx-2 btn-error'><FaRegTrashAlt className=''></FaRegTrashAlt></button>
            </div>
        </div>
    );
};

export default Comment;