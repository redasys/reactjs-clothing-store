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

export const addCollectionAndDocuments = async (key, items)=>{
    const collectionRef = firestore.collection(key);
    
    const batch = firestore.batch();
    items.forEach(obj=>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionSnapshotToMap=(collections)=>{
    const transformedCollections  = collections.docs.map(doc=>{
        const {title, items}=doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });

    return transformedCollections.reduce((acc, coll)=>{
        acc[coll.title.toLowerCase()] = coll;
        return acc;
    },{})
}

export const getCurrentUser=()=>{
    return new Promise((resolve, reject)=>{
        const unsubscribe = auth.onAuthStateChanged(userAuth=>{
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;