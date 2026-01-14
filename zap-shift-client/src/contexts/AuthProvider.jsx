import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext/AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  updateProfile} from 'firebase/auth';


const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading]= useState(true);
  


    const registerUser = (email, password) =>{
 return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password)=>{
      setLoading(true);
        return signInWithEmailAndPassword(auth, email,password)
    }

    const signInGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    }

    const logOut =()=> {
      setLoading(true);
     return  signOut(auth);
    }
 const updateUserProfile=()=>{
   return updateProfile(auth.currentUser, profile)
 }


    // observe user state
    useEffect (()=>{
  const unSubscribe=onAuthStateChanged(auth, (currentUser)=>{
  setUser(currentUser);
   setLoading(false);
   console.log(currentUser)
  })
  return ()=> {
    unSubscribe()
  }

    }, [])

    const authinfo ={
   user,
   loading,
   registerUser,
   signInUser,
    signInGoogle,
    logOut,
    updateUserProfile
    }  
  return (
    <div>
  <AuthContext value ={authinfo}>
    {children}
  </AuthContext>

    </div>
  );
};

export default AuthProvider;