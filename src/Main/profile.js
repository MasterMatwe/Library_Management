import React, { useState, useEffect } from 'react';
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        {Object.keys(user).map((key) => (
          <p key={key}>
            <strong style={{textTransform: 'Capitalize'}}>{key}:</strong> {key === 'role' ? (user[key] === 0 ? 'Khách hàng' : user[key]) : user[key]}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Profile;