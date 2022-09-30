import { initializeApp } from "firebase/app";
import React,{ useState, useEffect, createContext, useContext } from "react"
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../config/firebaseconfig";



// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();



export const createUser = async (email,password) => {
    alert(email+":"+password)

    return createUserWithEmailAndPassword(auth,email,password).then(res => {
        return res.user;

    }
    ).catch(error=>{
        alert(error);
        console.log(error);
    })
    
    
  };

  export const signIn = async (email,password) => {
    alert(email+":"+password);
    return signInWithEmailAndPassword(auth,email,password).then(res => {
        return res.user;

    }
    ).catch(error=>{
        alert(error);
        console.log(error);
    })    
    
  };

  export const parseCurrentUser = async()=>{
    const res= await onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          return user;
        } else {
          return null;
        }
      })
      alert("res1"+JSON.stringify(res));
      return res;

  }

  export const parseUser = async()=>{
    return await parseCurrentUser().then(res=>{
        alert("res2"+JSON.stringify(res));
    });
  }