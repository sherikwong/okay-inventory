// import { analytics, database, initializeApp } from 'firebase';
import { initializeApp, database } from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDj00a0U6ld-u8Pne_BsT9qJfAUb3IW3Y4",
  authDomain: "okay-2be48.firebaseapp.com",
  databaseURL: "https://okay-2be48.firebaseio.com",
  projectId: "okay-2be48",
  storageBucket: "okay-2be48.appspot.com",
  messagingSenderId: "481288243512",
  appId: "1:481288243512:web:4649a66235f19d7f6d19cd",
  measurementId: "G-EERCZ4N2XZ"
};

initializeApp(firebaseConfig);
// // analytics();

export const db = database();


