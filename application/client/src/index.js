import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PageRouter from './PageRouter';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <PageRouter />
  </React.StrictMode>
);
