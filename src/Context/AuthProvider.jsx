import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../FireBase/firebase.init";

const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [user,setUser]=useState(null)

  const provider = new GoogleAuthProvider();


  // for user registraion with credentials
  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };



  // for user login with credentials
  const SignInUser=(email,password)=>{
    setloading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }


// for signout
   const signOutUser=()=>{
    setloading(true)
    return signOut(auth)
  }

// for signin with google
const GoogleSignIn=()=>{
  setloading(true)
  return signInWithPopup(auth,provider)
}




// for showing user login and logout system
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser)
      setloading(false)
    })
    return()=>{
      unsubscribe()
    }
  },[])

  
  //for user logout

 
   
  


  const authInfo = {
    loading,
    createUser,
    SignInUser,
    user,
    signOutUser,
    GoogleSignIn
  };
  return (
    <AuthContext value={authInfo}>{children}</AuthContext>
  );
  }


export default AuthProvider;
