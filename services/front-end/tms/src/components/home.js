import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // For navigating to the dashboard
import './home.css';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // React Router's navigation function

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login credentials
    const dummyUsername = "ezv5135";
    const dummyPassword = "1234567";

    // Check if credentials match
    if (username === dummyUsername && password === dummyPassword) {
      setErrorMessage('');
      navigate("/dashboard");  // Navigate to the dashboard page on success
    } else {
      setErrorMessage('Invalid username or password');
    }
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
        <h2 className="login-title">Login or Sign Up</h2>

        <form className="login-form" onSubmit={handleLogin}>
          {/* Username and Password Fields */}
          <input 
            type="text" 
            placeholder="Username" 
            className="input-field" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}  // Update state
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update state
          />

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-btn">Login</button>

          <h3 className="quick-signup-title">Quick Sign Up</h3>
          <button className="google-signup-btn">
            <img src="google-logo.png" alt="Google Logo" className="google-logo" />
            Sign up with Google
          </button>

          <p className="or-text">Or use your email address</p>

          {/* Additional Inputs for Sign Up */}
          <input type="text" placeholder="Your first name" className="input-field" />
          <input type="text" placeholder="Your last name" className="input-field" />
          <input type="email" placeholder="Your email address" className="input-field" />
          <input type="password" placeholder="Pick a password" className="input-field" />
          <p className="password-text">
            Use at least one letter, one numeral, and seven characters.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Home;
