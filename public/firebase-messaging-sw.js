'use strict';

importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js");

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCq_RP2bgHXnjUCBXJqN2jmPff4mzqdC0Q",
    authDomain: "notificationapp-b7714.firebaseapp.com",
    projectId: "notificationapp-b7714",
    storageBucket: "notificationapp-b7714.appspot.com",
    messagingSenderId: "305703855632",
    appId: "1:305703855632:web:95750487a5779426b34c95",
    measurementId: "G-YG5K3J3ZCC"
  };

// Initialize the firebase in the service worker.
firebase.initializeApp(FIREBASE_CONFIG);
const messaging = firebase.messaging();

self.addEventListener('push', function (event) {
  var data = event.data.json();
  console.log('notification recieved : '+ JSON.stringify(data));
  const title = data.Title;
  const options = {
    body: data.Message,
    data: data.Data
  };
//   new Notification(title, options);
//   event.waitUntil(self.registration.showNotification(title, options));
  return self.registration.showNotification(title,
    options);
});

self.addEventListener('notificationclick', function (event) {});

self.addEventListener('notificationclose', function (event) {});

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    var obj = JSON.parse(payload.data.notification);
    const notificationTitle = obj.title;
    const notificationOptions = {
        body: obj.body,
        image: obj.image,
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
