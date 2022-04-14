// importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
// importScripts(
//     "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
// );
// // For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
// importScripts(
//     "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
// );

// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//     messagingSenderId: "305703855632",
//     apiKey: "AIzaSyCq_RP2bgHXnjUCBXJqN2jmPff4mzqdC0Q",
//     projectId: "notificationapp-b7714",
//     appId: "1:305703855632:web:95750487a5779426b34c95",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log(
//         "[firebase-messaging-sw.js] Received background message ",
//         payload,
//     );
//     // Customize notification here
//     const notificationTitle = "Background Message Title";
//     const notificationOptions = {
//         body: "Background Message body.",
//         icon: "/itwonders-web-logo.png",
//     };

//     return self.registration.showNotification(
//         notificationTitle,
//         notificationOptions,
//     );
// });



