import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../FireBase/firebase.init";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();

  // ✅ Create account with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Login with email/password
  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Sign in with Google
  const GoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // ✅ Sign out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  

  // ✅ Listen to Firebase Auth changes
// AuthProvider.js - শুধু এই useEffect টা update করুন
// AuthProvider.js - Revert to original but with better state update
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("Auth state changed:", currentUser);
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  const authInfo = {
    user,
    loading,
    createUser,
    SignInUser,
    GoogleSignIn,
    signOutUser,
    setUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
