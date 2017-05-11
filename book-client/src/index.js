import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
window.HOST = "http://localhost:3000"
window.API = "http://localhost:4000"
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
