import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyABcH42vv6YLeerY4NfXT9f8iVQCgf53jY",
    authDomain: "reactjs-crwn-clothing.firebaseapp.com",
    databaseURL: "https://reactjs-crwn-clothing.firebaseio.com",
    projectId: "reactjs-crwn-clothing",
    storageBucket: "reactjs-crwn-clothing.appspot.com",
    messagingSenderId: "1053422007780",
    appId: "1:1053422007780:web:acf7fc37ad81970108c3f1",
    measurementId: "G-NPE7TN5T6Q"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;