import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc, query, getDoc } from 'firebase/firestore/lite';
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig, firebasePubKey } from '../config';
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

export const getPushToken = async () => {
    return getToken(messaging, { vapidKey: firebasePubKey });
}

export const addData = async (c, id, payload) => {
    // Add a new message entry to the Firebase database.
    try {
        await setDoc(doc(db, c, id), payload);
    }
    catch (error) {
        console.error('Error writing new message to Firebase Database', error);
    }
}

export const getData = async (c) => {
    const protocol = collection(db, c);
    const protocolSnapshot = await getDocs(protocol);
    const protocolList = protocolSnapshot.docs.map(doc => doc.data());
    return protocolList;
}

export const getDataByID = async (c, id) => {
    const snap = await getDoc(doc(db, c, id));
    if (snap.exists()) {
        return snap.data();
    }
    else {
        return null;
    }
}


export const isUserSubscribed = async (account) => {
    const q = query(collection(db, 'subscriber'));
    const querySnapshot = await getDocs(q);
    return new Promise((resolve, reject) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().id == account) {
                resolve(doc.data().IsSubscribed);
            } else {
                reject(false);
            }
        });
    })
}

