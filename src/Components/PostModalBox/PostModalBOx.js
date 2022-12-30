import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';

const PostModalBOx = ({handlePost}) => {
    const { user } = useContext(AuthContext);
    const [caption, setCaption] = useState('');
    const navigate = useNavigate();

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handlePost} action="">
                        <div className="profilebox flex items-center">
                            <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" />
                            <div className='mx-3'>
                                <Link to='/profile' className='font-bold hover:link hover:text-blue-500'>{user?.displayName}</Link><br></br>
                                <span>{user?.email}</span>
                            </div>
                        </div>

                        <textarea onChange={e => setCaption(e.target.value)} name="caption" className="textarea textarea-bordered w-full my-4" rows="7" placeholder="What's on your Mind ?"></textarea>
                        <input onChange={e => setCaption(e.target.value)} name='postImage' accept='image/*' type="file" className="file-input file-input-bordered w-full my-3" />
                        <button disabled={caption.length === 0} className='text-center btn w-full'>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostModalBOx;