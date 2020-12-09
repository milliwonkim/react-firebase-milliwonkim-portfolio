import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: 'AIzaSyA6M3Wi1vKnEcGE2k3xLfbj6Lbg74fNtOs',
    authDomain: 'milliwonkim-portfolio-5bb1b.firebaseapp.com',
    projectId: 'milliwonkim-portfolio-5bb1b',
    storageBucket: 'milliwonkim-portfolio-5bb1b.appspot.com',
    messagingSenderId: '268423009022',
    appId: '1:268423009022:web:a6b3198dad44f2ba470baf',
    measurementId: 'G-BYVH9D9194',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
// firebase.analytics();

export { firebase };
