import { createUserWithEmailAndPassword,
             FacebookAuthProvider, 
             GithubAuthProvider, 
             GoogleAuthProvider, 
             onAuthStateChanged, 
             signInWithEmailAndPassword, 
             signInWithPopup,
              signOut, 
              updateProfile,
             } from 'firebase/auth';

import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebaseConfig';

export const AuthContext = createContext(null);

//social auth Provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //updateUserProfile
    const updateUserProfile = (name, image) =>{
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    //sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    //github login
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider)
    }
    //facebook login
    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider)
    }

    //Logout
    const logout = () => {
        setUser(null)
        signOut(auth)
    }

    //observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              setLoading(false);
            }
          });
          return () =>unsubscribe();
    },[])


    const allValues = {
        createUser,
        signInUser,
        googleLogin,
        githubLogin,
        logout,
        user,
        facebookLogin,
        updateUserProfile,
        loading
    }
    return ( 
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;