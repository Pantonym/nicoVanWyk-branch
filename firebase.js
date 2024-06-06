import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDlAQjNdTyicF48FNTzzirzGNd54IdH-jA",
    authDomain: "class-work-89441.firebaseapp.com",
    projectId: "class-work-89441",
    storageBucket: "class-work-89441.appspot.com",
    messagingSenderId: "96299922627",
    appId: "1:96299922627:web:942673253d2da17b8c1e76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore, Cloud Storage and get a reference to the service
export var db = getFirestore(app)