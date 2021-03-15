import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCRrcRuQfpeiIYBJdtAbR5xIYjbxZ_YXvQ",
    authDomain: "netflix-clone-d79ae.firebaseapp.com",
    projectId: "netflix-clone-d79ae",
    storageBucket: "netflix-clone-d79ae.appspot.com",
    messagingSenderId: "373434387292",
    appId: "1:373434387292:web:f64bbc95f5aae8920f0f99",
    measurementId: "G-E8S839RJHJ"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider };
export default db;
