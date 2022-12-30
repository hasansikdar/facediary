import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import { FaHeart, FaArrowCircleRight,FaRegTrashAlt, FaRegCommentAlt, FaShareAlt } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import Comments from '../../Components/Comments/Comments';
import { AuthContext } from '../../UserContext/UserContext';

const PostDetails = () => {
    const postDetails = useLoaderData();
    const { userName, userEmail, userPhoto, postImage, caption, _id } = postDetails;
    const [Comment, setComment] = useState('');
    const navigate = useNavigate();
    const { data: comments = [], refetch } = useQuery({
        queryKey: ['postImage'],
        queryFn: async () => {
            const res = await fetch(`https://facediary.vercel.app/comments?link=${postImage}`)
            const data = await res.json();
            return data;
        }
    })
    const handleComment = event => {
        event.preventDefault();
        const comment = event.target.comment.value;

        const commentInfo = {
            userName,
            userEmail,
            userPhoto,
            comment,
            caption,
            postImage
        }

        fetch(`https://facediary.vercel.app/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Comment Added')
                    event.target.reset();
                    refetch();
                }
            })

    }

    const DeleteComment = id => {
        console.log(id);
        fetch(`https://facediary.vercel.app/comment/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Comment Deleted');
                    refetch();
                }
            })

    }
    const DeletePostItem = id => {
        const agree = window.confirm('Are you sure delete this post ?');
        if (agree) {
            fetch(`https://facediary.vercel.app/post/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success("Deleted Post");
                        refetch();
                        navigate('/media');
                    }
                })
        }
    }


    return (
        <div>
            <Header></Header>
            <div className='post-details w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 my-10'>
                <PhotoProvider>
                    <PhotoView src={postImage}>
                        <img className='w-full' src={postDetails?.postImage ? postImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'} alt="" />
                    </PhotoView>
                </PhotoProvider>
                <div className='comment-section border sahdow-xl p-5'>
                    <div className='profile border p-3 flex mb-4'>
                        <img className='w-10 h-10 rounded-full' src={userPhoto} alt="" />
                        <div className='mx-4'>
                            <h3>{userName}</h3>
                            <span>{userEmail}</span>
                        </div>
                        <div className='ml-auto'>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn m-1">...</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                    {/* <li><Link to={`/postdetails/${_id}`} className='btn-sm btn my-2 text-white py-2'>Details</Link></li> */}
                                    <li><button onClick={() => DeletePostItem(_id)} className='btn-sm btn btn-error my-2 py-2'><FaRegTrashAlt className='text-white'></FaRegTrashAlt></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='caption'>
                        <p>{caption}</p>
                    </div>
                    <div className='reaction-display mt-2 flex w-1/2 border p-4 my-2 justify-between'>
                        <span><FaHeart></FaHeart>2.5k</span>
                        <span><FaRegCommentAlt></FaRegCommentAlt>1.5k Comment</span>
                        <span><FaShareAlt></FaShareAlt>1k share</span>
                    </div>
                    <div className='reactions flex w-1/2 border p-4 my-2 justify-between'>
                        <FaHeart className='text-3xl rounded cursor-pointer'></FaHeart>
                        <FaRegCommentAlt className='text-3xl rounded cursor-pointer'></FaRegCommentAlt>
                        <FaShareAlt className='text-3xl rounded cursor-pointer'></FaShareAlt>
                    </div>
                    <div className='comment-section'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Comment</span>
                            </label>
                            <form onSubmit={handleComment} action="">
                                <label className="input-group">
                                    <input onChange={e => setComment(e.target.value)} name='comment' type="text" placeholder="Write a comment..." className="input input-bordered" />
                                    <button disabled={Comment.length === 0} className='btn'><FaArrowCircleRight></FaArrowCircleRight></button>
                                </label>
                            </form>
                        </div>
                    </div>
                    <div className='comments'>
                        {comments.length > 0 ? <Comments DeleteComment={DeleteComment} comments={comments}></Comments> : <h1 className='text-2xl mt-5'>No Comments Available</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;