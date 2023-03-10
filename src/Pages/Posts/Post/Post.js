import React, { useContext } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { AuthContext } from '../../../UserContext/UserContext';

const Post = ({ post}) => {
    const {DeletePostItem} = useContext(AuthContext);
    const { userName, userEmail, userPhoto, postImage, caption, _id } = post;
    return (
        <div>
            <div className="card border !w-full my-5 bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className='profile flex mb-4'>
                        <img className='w-10 h-10 rounded-full' src={userPhoto} alt="" />
                        <div className='mx-4'>
                            <h3>{userName}</h3>
                            <span>{userEmail}</span>
                        </div>
                        <div className='ml-auto'>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn m-1">...</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link to={`/postdetails/${_id}`} className='btn-sm btn my-2 text-white py-2'>Details</Link></li>
                                    <li><button onClick={() => DeletePostItem(_id)} className='btn-sm btn btn-error my-2 py-2'><FaRegTrashAlt className='text-white'></FaRegTrashAlt></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>{caption.length > 100 ?
                        <>
                            {caption.slice(0, 100)}
                            < Link className='hover:link font-bold' to={`/postdetails/${_id}`}> See More...</Link>
                        </>

                        : caption}</p>

                </div>
                {postImage && <figure>
                    <PhotoProvider>
                        <PhotoView src={postImage}>
                            <img className='w-full' src={postImage} alt="Shoes" />
                        </PhotoView>
                    </PhotoProvider></figure>}

                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-primary">25.6K</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title"></div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div>Share</div>
                        <div className="stat-value">86%</div>
                        <div className="stat-title">Tasks done</div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Post;