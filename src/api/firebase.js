

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import "firebase/auth"

const app = initializeApp({
    apiKey: "AIzaSyBw3P4DRPdyLtCQQfnqQG3VoODHY9fvKkk",
    authDomain: "docker-management-8e7bf.firebaseapp.com",
    projectId: "docker-management-8e7bf",
    storageBucket: "docker-management-8e7bf.appspot.com",
    messagingSenderId: "77659058516",
    appId: "1:77659058516:web:80633be0a3821f023358c1",
    measurementId: "G-XM9K1Z6Z9P"
})

export const auth = getAuth();
export default app