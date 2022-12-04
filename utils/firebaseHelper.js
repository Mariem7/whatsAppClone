// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const getFireBaseApp = () => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBnesZOa1I-kN3BAunYjNyZQi_CxOiupTM",
      authDomain: "whatsapp-8dec2.firebaseapp.com",
      databaseURL: "https://whatsapp-8dec2-default-rtdb.firebaseio.com",
      projectId: "whatsapp-8dec2",
      storageBucket: "whatsapp-8dec2.appspot.com",
      messagingSenderId: "283737916505",
      appId: "1:283737916505:web:770be518b744432f18dd48",
      measurementId: "G-Z4C01ZFPM5"
    };
    
    // Initialize Firebase
    return initializeApp(firebaseConfig);
}