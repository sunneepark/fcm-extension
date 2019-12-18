

// Initialize Firebase
var config = {
  apiKey: "your api key",
  messagingSenderId: "your senderid"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.usePublicVapidKey('your vapid key');
    // [END set_public_vapid_key]

function initApp() {  
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
    requestPermission();
  });

}

function requestPermission(){ //알람 동의 구하기
  console.log('Requesting permission...');
  // [START request_permission]
  Notification.requestPermission().then((status) => {
    console.log(status);
    if(Notification.permission !== status){
      Notification.permission=status;
    }
    if (status === 'granted') {
      console.log('Notification permission granted.');
      getToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

function getToken(){

  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
    
      setTokenSentToServer(false);
    }
  }).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    setTokenSentToServer(false);
  });

}

function sendTokenToServer(currentToken) { //토큰 보내기
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...');
    console.log('token is '+currentToken);

    // TODO(developer): Send the current token to your server.
    setTokenSentToServer(true,currentToken);
  } else {
    console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
  }

}

function isTokenSentToServer() { //토큰 존재 여부
  return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent, token) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  window.localStorage.setItem('token', token);
}

/***** 알람 customize*****/
messaging.onMessage(function(payload) {
  console.log('Message receive// ', payload);

  var notifOptions={
    type: 'basic', 
    iconUrl: './logo.png', 
    title: payload.notification.title, 
    message: '새 글이 등록되었습니다.',
    buttons: [{
        title: "확인",

    }, {
        title: "닫기",

    }]
  }

  chrome.notifications.create("limitnoitif",notifOptions);
  /*chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
      if(btnIdx==0)
          alert(doc_id);
  });*/
  
});
window.onload = function() {
  initApp();
};
