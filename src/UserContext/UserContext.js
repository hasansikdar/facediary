import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();
const auth = getAuth(app)
const UserContext = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);
    const GoogleProvider = new GoogleAuthProvider();
    const { data: OwnProfile = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`http://localhost/user?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });

    const CreateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const Login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const GoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    }
    const handleLogOut = () => {
        return signOut(auth);
    }
    const updateprofile = (profileinfo) => {
        return updateProfile(auth.currentUser, profileinfo);
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
                    }
                })
        }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])



    const authinfo = { DeletePostItem, refetch, updateprofile, CreateUser, GoogleLogin, Login, handleLogOut, user, loading }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;