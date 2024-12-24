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
          <span>Welcome, {user.username} !</span>
          <button onClick={() => console.log('Notifications')}>🔔</button>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3z"/>
              <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"/>
            </svg>
            <Link to="/" onClick={() => localStorage.removeItem('user')}>Logout</Link>
            </li>
        </div>
      </div>
    </header>
  );
}

export default Header;