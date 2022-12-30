import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../UserContext/UserContext';
import Post from '../../Posts/Post/Post';

const HomePosts = () => {
    const {refetch } = useContext(AuthContext);



    // get posts
    const { data: posts = [], } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://facediary.vercel.app/homeposts');
            const data = await res.json();
            refetch();
            return data;
        }
    })



    return (
        <div>
            {
                posts.map(post => <Post post={post}></Post>)
            }
        </div>
    );
};

export default HomePosts;