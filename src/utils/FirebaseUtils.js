import firebase from 'firebase';
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDEA_mOX_0o0GxRMCVFHQJGDkU525lM5S4",
    authDomain: "open-house-9cd52.firebaseapp.com",
    databaseURL: "https://open-house-9cd52.firebaseio.com",
    projectId: "open-house-9cd52",
    storageBucket: "open-house-9cd52.appspot.com",
    messagingSenderId: "931977249549"
  };
  
  export const firebaseImpl = firebase.initializeApp(config);
  export const firebaseDatabase = firebase.database();
  export const firebaseAuth = firebase.auth();
