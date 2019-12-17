

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 
 importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 // Initialize Firebase
var config = {
  apiKey: "AIzaSyA-T75QDYHQvhMPXQBE7QTdFu6-NLPk_8s",
  messagingSenderId: "243806766229"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();


 //background 에서 메시지 받기
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
 
  var notificationTitle = 'Background';
  var notificationOptions = {
    body: 'Background',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,notificationOptions);
});
// [END background_handler]
