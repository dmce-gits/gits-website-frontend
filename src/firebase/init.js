import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCWX9vdYEtH0F8z_RdtYATy3AYY6IaKAdc",
  authDomain: "git-website-490ba.firebaseapp.com",
  databaseURL: "https://git-website-490ba-default-rtdb.firebaseio.com",
  projectId: "git-website-490ba",
  storageBucket: "git-website-490ba.appspot.com",
  messagingSenderId: "98278579912",
  appId: "1:98278579912:web:41662294a35cb1054f0ffd",
  measurementId: "G-5J8P9EDEZS",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };
