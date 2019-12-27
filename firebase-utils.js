import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: " AIzaSyBRdBY9MAPnAWsoF04Yjyzl4QUB0pJvFYo ",
  authDomain: "seven-db.firebaseapp.com",
  databaseURL: "https://seven-db.firebaseio.com",
  projectId: "seven-db",
  storageBucket: "seven-db.appspot.com",
  messagingSenderId: "675511582732 ",
  appId: " 1: 675511582732: web: fe1a3c4f1168ccc2af6e29 ",
  measurementId: " G-QMN2ZXZ3CB "
}; // Initialize Firebase    firebase . analytics ();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
