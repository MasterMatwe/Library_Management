import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Sidebar.css';

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="sidebar">
      <Header />
      <nav>
        <ul>
          {user.role === 0 && (
            <>
              <li><Link to="/customer-dashboard">🖥️ Dashboard</Link></li>
              <li><Link to="/customer-dashboard/profile">💼 Profile</Link></li>
              <li><Link to="/customer-dashboard/giohang">📚 Borrowed Books</Link></li>
            </>
          )}
          {user.role === 1 && (
            <>
              <li><Link to="/employee-dashboard">🖥️ Dashboard</Link></li>
              <li><Link to="/employee-dashboard/manage-books">Manage Books</Link></li>
              <li><Link to="/employee-dashboard/ManageRole">👨🏻‍💼 Manage Role</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;