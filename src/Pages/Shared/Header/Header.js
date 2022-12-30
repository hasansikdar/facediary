import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../UserContext/UserContext';
import Logo from '../../../Assets/logo.png';


const Header = () => {
    const { user, loading, handleLogOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSingOut = () => {
        handleLogOut()
            .then(res => {
                const agree = window.confirm('Are your sure want to Logout ?');
                if (agree) {
                    toast.success('Logout Successfull');
                    navigate('/join');
                }
            })
            .catch(error => {
                toast(error.message);
            })
    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/home'>Home</Link></li>
                            <li><Link to='/mynetwork'>My Network</Link></li>
                            <li><Link to='/jobs'>Jobs</Link></li>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl"><img className='w-full h-full' src={Logo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/mynetwork'>My Network</Link></li>
                        <li><Link to='/jobs'>Jobs</Link></li>
                        {
                            user?.email ? <></> : <>
                                {loading ? <div>Loading...</div> : <>
                                    <li><Link to='/join' className='btn btn-outline btn-primary'>Join</Link></li>
                                    <li><Link className='btn btn-outline btn-info ml-3'>Sign In</Link></li>
                                </>}
                            </>
                        }
                    </ul>
                </div>
                <div className="dropdown dropdown-end ml-auto">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="" src={user ? user?.photoURL : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            user ?
                                <>
                                    <li>
                                        <Link to='/profile' className="justify-between">
                                            Profile
                                            <span className="badge">{user?.displayName}</span>
                                        </Link>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><button onClick={handleSingOut}>Logout</button></li>
                                </>
                                :
                                <>
                                    <li><Link to='/join' className='btn btn-outline btn-primary'>Join</Link></li>
                                    <li><Link to='/login' className='btn mt-2 btn-outline btn-primary'>Login</Link></li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;