import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import AboutUs from "./components/AboutUs";
import UserHomePage from "./components/UserHomePage";
import MyProfilePage from "./components/MyProfilePage";
import './components/Design.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/signout');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAccountDeletion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/userhomepage" element={isAuthenticated ? <UserHomePage /> : <HomePage />} />
        <Route path="/my-profile" element={isAuthenticated ? <MyProfilePage onAccountDeletion={handleAccountDeletion} /> : <HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;