import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppFooter from './components/AppFooter';
import reportWebVitals from './reportWebVitals';

ReactDOM.render([<App key='1' />, <AppFooter key='2' />], document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
