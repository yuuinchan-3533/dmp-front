import { async } from "@firebase/util"
import React, { useContext, useState, useEffect } from "react"
import { getUserType } from "../api/fireStoreApi"
import { auth } from "../firebase/firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user){
      if(user){
        const fetchData = async () =>{
          const {type} = await getUserType(user.email);
          const currentUser = user;
          currentUser.type = type;
          setCurrentUser(currentUser);
          setLoading(false);
        };
        fetchData();
      }
      
    });

    
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}