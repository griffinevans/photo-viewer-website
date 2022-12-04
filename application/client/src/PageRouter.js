import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import { Login } from './pages/Login';
import { PostImage } from './pages/PostImage';
import Register from './pages/Register';
import { ViewPost } from './pages/ViewPost';

function AppRouter() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Index /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/PostImage" element={ <PostImage /> } />
        <Route path="/Register" element={ <Register /> } />
        <Route path="/ViewPost" element={ <ViewPost /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
