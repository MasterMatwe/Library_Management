import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './Auth.css';

function AuthContainer() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="auth-container">
      <div className={`forms-container ${isLoginForm ? '' : 'slide'}`}>
        <Login />
        <Register />
      </div>
      <button className="toggle-btn" onClick={toggleForm}>
        {isLoginForm ? 'Need to register?' : 'Already have an account?'}
      </button>
    </div>
  );
}

export default AuthContainer;