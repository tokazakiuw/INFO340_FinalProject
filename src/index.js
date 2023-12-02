import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './components/App';
import { initializeApp } from "firebase/app";
import 'whatwg-fetch';
//import reportWebVitals from './reportWebVitals';


const firebaseConfig = {
  apiKey: "AIzaSyBzWx8HRbO63c92Q20U6Pw6FLvft_ZX8kI",
  authDomain: "project-kkenohh.firebaseapp.com",
  projectId: "project-kkenohh",
  storageBucket: "project-kkenohh.appspot.com",
  messagingSenderId: "245362949852",
  appId: "1:245362949852:web:d5254b5e6f1148ccc93e19"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
