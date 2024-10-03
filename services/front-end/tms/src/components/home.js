import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  // For navigating to the dashboard
import './home.css';

function Home() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // React Router's navigation function

  // Function to handle login with back-end API
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/login', { loginEmail, loginPassword });
      localStorage.setItem('token', response.data.token); // Save JWT token to localStorage
      console.log('Login successful:', response.data.token);
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (err) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  // Function to handle registration with back-end API
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(registerPassword !== verifyPassword){
        setErrorMessage('Passwords do not match!');
        return;
      }
      const response = await axios.post('http://localhost:5001/register', {
        firstName,
        lastName,
        email,
        registerPassword
      });
      console.log('Registration successful', response.data);
      setSuccessMessage('User registered successfully!'); // Display success message
      setErrorMessage('');  // Clear error message if registration is successful

      // Clear all input fields after successful registration
      setFirstName('');
      setLastName('');
      setEmail('');
      setRegisterPassword('');
      setVerifyPassword('');

      // Automatically clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);  // 3000 milliseconds = 3 seconds

      navigate('/'); // Redirect to the login form after successful registration
    } catch (err) {
      setErrorMessage('Registration failed. Try again.');
    }
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setRegisterPassword('');
    setVerifyPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="home-container">
      <div className="home-left">
        <h1 className="main-title">Talent Management System</h1>
        <h2 className="subtitle">Find your resources, list your needs and...</h2>
        <p className="description">
          …achieve your project goals with the Talent Management System (TMS). 
          With TMS, we provide innovative solutions to help businesses and teams 
          effectively manage and grow their workforce. Whether you’re looking to 
          add new talent, track skills, or manage resource requests, our platform 
          is designed to simplify and streamline the talent management process.
        </p>
      </div>

      <div className="home-right">
        <h2 className="login-title">Login</h2>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Email" 
            className="input-field" 
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}  // Update state
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field" 
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}  // Update state
          />

          {/* Error Message for Login */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <h2 className="login-title"> or Sign Up</h2>

        {/* Registration Form */}
        <form className="login-form" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Your first name" 
            className="input-field" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Your last name" 
            className="input-field" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Your email address" 
            className="input-field" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Create a password" 
            className="input-field" 
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Verify password" 
            className="input-field" 
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />

          {/* Error Message for Registration */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="google-signup-btn">
            Sign Up
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear Form
          </button>
        </form>

        {/* Success Message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Home;