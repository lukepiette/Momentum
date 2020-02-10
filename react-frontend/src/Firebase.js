import firebase from 'firebase';
require('firebase/app');
require('firebase/database');
require('firebase/storage');
require('firebase/auth');

const config = {
    apiKey: "AIzaSyAXIkHXsU49u1u03od6iYyApgvqYe7R6sM",
    authDomain: "momentum-12364.firebaseapp.com",
    databaseURL: "https://momentum-12364.firebaseio.com",
    projectId: "momentum-12364",
    storageBucket: "momentum-12364.appspot.com",
    messagingSenderId: "689157210261",
    appId: "1:689157210261:web:5fc2f94609ca8166c61b9c",
    measurementId: "G-0NS2EXRDTQ"
  };

firebase.initializeApp(config);

export default firebase;