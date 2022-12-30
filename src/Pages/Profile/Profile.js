import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../UserContext/UserContext';
import Googleicon from '../../Assets/Googleicon.png';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const { CreateUser, user, updateprofile, GoogleLogin, } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const {data:userInfo = {}, } = useQuery({
        queryKey: ['email'],
        queryFn: async () => {
            const res = await fetch(`https://facediary.vercel.app/users?email=${user?.email}`);
            const data = res.json();
            return data;
        }
    });

    console.log(userInfo);


    const handleUpdateProfileInfo = (info) => {
        console.log(info);
        setLoading(true);
        const imagefile = info?.profileImage[0];
        const imagedata = new FormData();
        imagedata.append('image', imagefile);
        const name = info?.name;
        const url = `https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026`;
        fetch(url, {
            method: 'POST',
            body: imagedata
        })
            .then(res => res.json())
            .then(data => {
                const imageLink = data?.data?.display_url;
                const userinfo = {
                    displayName: name,
                    photoURL: imageLink
                }
                updateprofile(userinfo)
                    .then(res => {
                        saveUseInrDB(info, imageLink)
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error(error.message)
                    })
            })

    }
    const saveUseInrDB = (info, imageLink) => {
        // const { name, password, email } = info;
        const userinfo = {
            name:info?.name,
            profileImage: imageLink,
            university:info?.university

        }

        fetch(`https://facediary.vercel.app/users?email=${user?.email}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userinfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Update Successful');
                    setLoading(false);
                    navigate('/');
                }
            })

    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="">
                    <h1 className='text-3xl my-4 text-center'>Update Profile</h1>
                    <div className="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleUpdateProfileInfo)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input defaultValue={user?.displayName} {...register('name')} type="text" placeholder="Name" className="input input-bordered" />
                                {errors?.name && <span className='text-red-500 mt-2'>{errors?.name?.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">University</span>
                                </label>
                                <input defaultValue={userInfo?.university} {...register('university')} type="text" placeholder="University" className="input input-bordered" />
                                {errors?.university && <span className='text-red-500 mt-2'>{errors?.university?.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image Upload</span>
                                </label>
                                <input placeholder='Choose Image' accept='image/*' {...register('profileImage', {
                                    required: "Image is Required",

                                })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                {errors?.profileImage && <span className='text-red-500 mt-2'>{errors?.profileImage?.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input readOnly defaultValue={user?.email} type="text" placeholder="email" className="input input-bordered" />
            
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={loading} className="btn btn-primary">{loading ? "Loading..." : "Update"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;