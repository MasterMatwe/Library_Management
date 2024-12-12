import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import './Auth.css';

function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 350); // Match this with your CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const toggleView = () => {
    setIsTransitioning(true);
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="auth-container">
      <div className={`forms-container ${isTransitioning ? 'fade' : ''}`}>
        {isLoginView ? (
          <div className="login-wrapper">
            <Login />
            <button onClick={toggleView} className="toggle-btn" disabled={isTransitioning}>
              Need an account? Register
            </button>
          </div>
        ) : (
          <div className="register-wrapper">
            <Register />
            <button onClick={toggleView} className="toggle-btn" disabled={isTransitioning}>
              Already have an account? Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;