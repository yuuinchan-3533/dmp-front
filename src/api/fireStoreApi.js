import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    getDoc,
  } from "@firebase/firestore";
  import firebase from "firebase/compat/app";
  import { string } from "prop-types";
  import firebaseConfig from "../config/firebaseconfig";
  
  const init = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(init);
  const userInfoCollectionRef = collection(db, "UserInfo");
  const imageSecurityLevelRef = collection(db, "ImageSecurityLevel");
  
  export const createUserInfo = async (data) => {
    alert(JSON.stringify(data));
    // {foodName: 'tmp', foodDescription: 'no', foodPrice: '1', restaurantID: 'ZlXgHMiTWzgpK9YwtL3zsbF75St1', status: 'Not seen'}
  
    await addDoc(userInfoCollectionRef, data).catch((error) => {
      alert(JSON.stringify(error));
    });
  
  };
  
  export const createImageSecurityLevel = async (data) => {
  
    await addDoc(imageSecurityLevelRef, data).catch((error) => {
      alert(JSON.stringify(error));
    });
  
  };
  
  export const updateImageSecurityLevel = async (id, level) => {
    const q = query(imageSecurityLevelRef, where("imageId", "==", id));
    const querySnapshot = await getDocs(q);
    let type;
    let targetId;
    querySnapshot.forEach((doc) => {
      targetId = doc.id;
  
    });
  
    const securityItem = doc(db, "ImageSecurityLevel", targetId);
    const docSnap = await getDoc(securityItem);
  
    try {
     
      
      await updateDoc(securityItem, {
        securityLevel: level
      });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  
  
  
  };
  
  export const getAllImageSecurityLevel = async () => {
    const data = await getDocs(imageSecurityLevelRef);
    var securityMap = new Map();
    data.forEach((doc) => {
  
      var imgId = doc.data().imageId;
      var secLvl = doc.data().securityLevel;
  
      try {
        securityMap[imgId] = secLvl;
      } catch (error) {
        alert(error.message);
      }
    });
  
    return securityMap;
  };
  
  export const getUserType = async (email) => {
    const q = query(userInfoCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let type;
    querySnapshot.forEach((doc) => {
  
      type = doc.data().userType;
    });
  
    return { type };
  };
  
  