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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdDt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdDt,
                ...additionalData
            })
        } catch (e) {
            console.log('error creating user', e.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;