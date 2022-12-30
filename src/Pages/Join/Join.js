import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../UserContext/UserContext';
import Googleicon from '../../Assets/Googleicon.png';
import { toast } from 'react-hot-toast';

const Join = () => {
    const { CreateUser, updateprofile, GoogleLogin, } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    const handleCreateAccount = data => {
        setLoading(true);
        const { email, password } = data;
        CreateUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                handleUpdateProfileInfo(data);
            })
            .catch(error => {
                console.log(error)
                toast.error(error.message);
            })
    }

    const handleGoogleLogin = () => {
        GoogleLogin()
            .then(res => {

                SaveGoogleDbData(res?.user)
            })
            .catch(error => {
                toast.error(error.message)
                console.log(error.message)
            })
    }

    const SaveGoogleDbData = info => {
        const userinfo = {
            name: info?.displayName,
            profileImage: info?.photoURL,
            email: info?.email,
        }

        // save in users data in users collection 
        fetch(`https://facediary.vercel.app/users?email=${info?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userinfo)

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Google Login Success')
                    navigate('/');
                }
            })



    }



    const handleUpdateProfileInfo = (info) => {
        const imagefile = info?.profileImage[0];
        const imagedata = new FormData();
        imagedata.append('image', imagefile);
        const name = info.name;
        const url = `https://api.imgbb.com/1/upload?key=20479324d2295d17d9027f196b869026`;
        fetch(url, {
            method: 'POST',
            body: imagedata
        })
            .then(res => res.json())
            .then(data => {
                const imageLink = data.data.display_url;
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
        const { name, password, email } = info;
        const userinfo = {
            name,
            email,
            password,
            profileImage: imageLink
        }

        fetch('https://facediary.vercel.app/users', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userinfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Accround Created Successful');
                    setLoading(false);
                    navigate('/');
                }
            })

    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2">
                    <div className="div">
                        <h1 className='text-3xl'>Create Account</h1>
                        <img src="https://www.shutterstock.com/image-vector/online-registration-sign-concept-young-260nw-1705979812.jpg" alt="" />
                    </div>
                    <div className="card flex-shrink-0  max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(handleCreateAccount)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register('name', {
                                    required: "Name is Required"
                                })} type="text" placeholder="Name" className="input input-bordered" />
                                {errors?.name && <span className='text-red-500 mt-2'>{errors?.name?.message}</span>}
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
                                <input {...register('email', {
                                    required: "Email is Required"
                                })} type="text" placeholder="email" className="input input-bordered" />
                                {errors?.email && <span className='text-red-500 mt-2'>{errors?.email?.message}</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register('password', {
                                    required: "Password Must be Required",
                                    minLength: { value: 8, message: "Password Must be 8 charecter" },
                                    maxLength: { value: 13, message: "Password Maximum 13 Charecter" },
                                    pattern: { value: /[.*+?^${}()|[\]\\]/g, message: "Password Must be Strong Use $, ?" }
                                })} type="text" placeholder="password" className="input input-bordered" />
                                {errors?.password && <span className='text-red-500 mt-2'>{errors?.password?.message}</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button disabled={loading} className="btn btn-primary">{loading ? "Loading..." : "Create Account"}</button>
                            </div>
                        </form>
                        <div className='my-5 mt-0 mx-7'>
                            Already have and Account<Link className='link text-blue-500' to='/login'> Sign In</Link>
                        </div>
                        <div className="form-control mx-7 mb-3 shadow">
                            <img onClick={handleGoogleLogin} className='w-14 text-center mx-auto cursor-pointer' src={Googleicon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;