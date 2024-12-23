import React, { useState, useEffect } from 'react';
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const dummyUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      memberSince: '2023-01-01',
      booksRead: 15,
      favoriteGenre: 'Science Fiction'
    };
    setUser(dummyUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> {user.memberSince}</p>
        <p><strong>Books Read:</strong> {user.booksRead}</p>
        <p><strong>Favorite Genre:</strong> {user.favoriteGenre}</p>
      </div>
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );
}

export default Profile;