import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { PostImage } from './pages/PostImage';
import { ViewPost } from './pages/ViewPost.jsx';
import Register from './pages/Register';
import { Forbidden } from './pages/Forbidden.jsx';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Index /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/PostImage" element={ <PostImage /> } />
        <Route path="/Register" element={ <Register /> } />
        <Route
          path="posts/:postId"
          element={<ViewPost />}
          errorElement={ <Forbidden /> }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
