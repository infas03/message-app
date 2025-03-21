import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../screens/landingPage';
import MessageHome from '../screens/message/messageHome';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/message" element={<MessageHome />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;