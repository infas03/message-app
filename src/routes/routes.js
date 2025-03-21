// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../screens/landingPage';
import Chat from '../screens/chat';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;