import React, { createContext, useEffect, useState } from 'react';
import app from '../../../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext()
const auth = getAuth(app)


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin or login user
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, {
            displayName: userInfo
        })

    }

    // log out
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // user obserbation
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('User observing');
            setUser(currentUser);
            setLoading(false)
        })
        return () => unSubscribe();
    }, [])



    const authInfo = { createUser, signIn, user, logOut, loading, updateUser }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;