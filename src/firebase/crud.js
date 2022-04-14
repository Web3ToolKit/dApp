import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc , query } from 'firebase/firestore/lite';

import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCq_RP2bgHXnjUCBXJqN2jmPff4mzqdC0Q",
    authDomain: "notificationapp-b7714.firebaseapp.com",
    projectId: "notificationapp-b7714",
    storageBucket: "notificationapp-b7714.appspot.com",
    messagingSenderId: "305703855632",
    appId: "1:305703855632:web:95750487a5779426b34c95",
    measurementId: "G-YG5K3J3ZCC"
  };

const pubKey = "BHf3LC4ZB_U9YU9ZNaFDyE_b5bXal1UCSUJQtCTdcJVO8E_YKjNNpVEfGzlHvLpw4oezqtv8YKCKxLP3gaKrB9o";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const messaging = getMessaging(app);

export const getPushToken = async () => {
    return getToken(messaging, {vapidKey: pubKey});
}

export const addData = async(c, id, payload) => {
    // Add a new message entry to the Firebase database.
    try {
      await addDoc(collection(db, c), {
        id: id,
        payload: payload
      });
    }
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

export const getData = async(c) => {
    const protocol = collection(db, c);
    const protocolSnapshot = await getDocs(protocol);
    const protocolList = protocolSnapshot.docs.map(doc => doc.data());
    return protocolList;
  }


  export const isUserSubscribed = async (account) => {
    const q = query(collection(db, 'subscriber'));
    const querySnapshot = await getDocs(q);
    return new Promise((resolve, reject) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().id == account) {
                resolve(doc.data().payload.IsSubscribed);
            } else {
                reject(false);
            }
        });
    })
  }

