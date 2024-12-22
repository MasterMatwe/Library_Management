import React, { useEffect, useState } from 'react';import React, { useEffect, useState } from 'react';function Profile() {
  const [user, setUser ] = useState(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const loggedInUser  = JSON.parse(localStorage.getItem('user'));
    setUser (loggedInUser );
  }, []);

  return (
    <div className="customer-dashboard/profile">
      {user ? (
        <div>
          <h1>Thông tin cá nhân</h1>
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>Tài khoản:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
          <p><strong>Số điện thoại:</strong> {user.phone}</p>
        </div>
      ) : (
        <p>Không có thông tin người dùng.</p>
      )}
    </div>
  );
}

export default Profile;