import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import App from './App.jsx'

const firebaseConfig = {
  apiKey: "AIzaSyAh6ULhbcRscOS2L3PBmR5QmPZXt97Q0kk",
  authDomain: "appfinal-d6335.firebaseapp.com",
  projectId: "appfinal-d6335",
  storageBucket: "appfinal-d6335.appspot.com",
  messagingSenderId: "30525678029",
  appId: "1:30525678029:web:1a2429f7185f20de5be484"
};

const app = initializeApp(firebaseConfig);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
