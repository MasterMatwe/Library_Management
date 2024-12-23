import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
function Header() {
   const user = JSON.parse(localStorage.getItem('user'));
  return (
    <header className="header">
      <div className="header-content">
        <h1>ReLiB</h1>
        <div className="user-info">
          <span>Welcome, {user.username}!</span>
          <button onClick={() => console.log('Notifications')}>Notifications</button>
          <li><Link to="/" onClick={() => localStorage.removeItem('user')}>Logout</Link></li>
        </div>
      </div>
    </header>
  );
}

export default Header;