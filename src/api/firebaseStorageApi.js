import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";


import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseconfig";
import { async } from "@firebase/util";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fs = require('fs');


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);



export const uploadDockerFile = async (file) => {
    //const storageRef = ref(storage, `dishPhoto/${uid}/photo.jpg`);
    //uploadBytes(storageRef, file).then((snapshot) => {

    //  console.log("Uploaded a blob or file!");
    //});
    //alert(JSON.stringify(res));


    const timeStamp = Date.now();

    const storageRef = ref(storage, `dockerFile/${timeStamp}`);
    uploadBytes(storageRef, file)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                alert(downloadURL);
                console.log(downloadURL)
            })
        }).catch(error=>{
            alert(error);
            console.log(error);
        })    
};

export const getDownloadUrl =  () =>{
    const storageRef = ref(storage, `dockerFile/demo2.res`);
    return getDownloadURL(ref(storage, storageRef))
    .then((url)=>{
        
    });
}

export const download = (event) => {
    alert("download");
    const storageRef = ref(storage, `dockerFile/demo2.res`);
    getDownloadURL(ref(storage, storageRef))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            alert(JSON.stringify(url));
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();


        })
        .catch((error) => {
            alert(error.message);
            // Handle any errors
        });


};

