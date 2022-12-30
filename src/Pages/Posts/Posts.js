import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import Post from './Post/Post';

const Posts = () => {
    // const {refetch } = useContext(AuthContext);


    const { data: posts = [], } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://facediary.vercel.app/posts');
            const data = await res.json();
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

export default Posts;