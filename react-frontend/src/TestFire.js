import firebase from "./Firebase";


const rootRef = firebase.database().ref().child('root');
const gotitRef = rootRef.child('test').child('test').child('gotit');


console.log(gotitRef)