import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {ResultContextProvider} from './context/ResultContextProvider'
import  AuthContextProvider  from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthContextProvider>
    <ResultContextProvider>
      <Router>
    <App />
      </Router>
      </ResultContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);



// const options = {
//   method: 'GET',
//   url: 'https://g-search.p.rapidapi.com/location',
//   params: {location_name: 'London', country_code: 'GB'},
//   headers: {
//     'X-RapidAPI-Key': '20afecf17cmshc445fe24cff4a85p1a32ccjsnf2dc86b552bf',
//     'X-RapidAPI-Host': 'g-search.p.rapidapi.com'
//   }
// }