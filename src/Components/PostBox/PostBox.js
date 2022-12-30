import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';
import PostModalBOx from '../PostModalBox/PostModalBOx';

const PostBox = () => {
    const {user, refetch} = useContext(AuthContext);

    // const {reset} = useForm();

    const navigate = useNavigate();

   



    const handlePost = event => {
        event.preventDefault();
        const caption = event.target.caption.value;
        const image = event.target.postImage.files[0];
        const formData = new FormData();
        formData.append('image', image);

        
        const url = `https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026`;
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData => {
            const PostContent = {
                userName: user?.displayName,
                userEmail: user?.email,
                userPhoto: user?.photoURL,
                caption,
                postImage: imageData?.data?.display_url
            }
            handlePostItem(PostContent)
            event.target.reset();
            })

    }

    // handle post in database
    const handlePostItem = info => {
        fetch('https://facediary.vercel.app/posts', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('Post Success');
                refetch();
                navigate('/media')
            }
        })
    }


    return (
        <div>
            <div className="alert shadow-lg">
                <div>
                    <img className='w-10 rounded-full h-10' src={user?.photoURL} alt="" />
                    {/* <input disabled placeholder='What is your mind?' type="text" /> */}
                    <label htmlFor="my-modal-3" className="input input-bordered w-80 mx-auto py-3 cursor-pointer">What's On Your Mind?</label>
                    {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
                    <PostModalBOx handlePost={handlePost}></PostModalBOx>
                </div>
            </div>
        </div>
    );
};

export default PostBox;