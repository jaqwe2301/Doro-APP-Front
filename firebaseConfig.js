import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/firestore";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeMT7Qxn6HuS6HEUYNMJpkYXAFRl2pKEU",
  authDomain: "doro-app-project.firebaseapp.com",
  databaseURL: "https://doro-app-project.firebaseio.com",
  projectId: "doro-app-project",
  storageBucket: "doro-app-project.appspot.com",
  messagingSenderId: "772279583725",
  appId: "1:772279583725:web:7c765e66f34d936e471de4",
  measurementId: "G-RR4RJB9SRW",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
