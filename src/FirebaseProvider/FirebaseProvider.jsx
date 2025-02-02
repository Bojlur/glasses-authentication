import { createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebaseConfig';

export const AuthContext = createContext(null);

//social auth Provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const FirebaseProvider = ({children}) => {
    const [user, setUser] = useState(null);
    console.log(user)

    //create user
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in user
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }
    //github login
    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider)
    }
    //facebook login
    const facebookLogin = () => {
        return signInWithPopup(auth, facebookProvider)
    }

    //Logout
    const logout = () => {
        setUser(null)
        signOut(auth)
    }

    //observer
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            }
          });
    },[])


    const allValues = {
        createUser,
        signInUser,
        googleLogin,
        githubLogin,
        logout,
        facebookLogin,
        user
    }
    return ( 
        <AuthContext.Provider value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;