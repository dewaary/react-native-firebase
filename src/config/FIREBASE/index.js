// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// import 'firebase/compat/[SERVICE_NAME]';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRAAFodJTFYhhHhC4cLL0gFtKGz0T77EQ',
  authDomain: 'crud-react-mobile.firebaseapp.com',
  projectId: 'crud-react-mobile',
  storageBucket: 'crud-react-mobile.appspot.com',
  messagingSenderId: '449492254402',
  appId: '1:449492254402:web:bf9ea8f95345fe64da455b',
};

// Initialize Firebase
const FIREBASE = firebase.initializeApp(firebaseConfig);

export default FIREBASE;

// export const db = getFirestore(FIREBASE);
