import React from 'react';
import ReactDOM from 'react-dom';
import Parser from 'html-react-parser/dist/html-react-parser'
import './index.css';
import App from './App';
import {AuthContextProvider} from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
     <MovieContextProvider>
       
    <App />
    
     </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

