import React, { useState, useEffect } from 'react';
import './ManageRole.css';

function ManageRole() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (tai_khoan, currentQuyen) => {
    const newQuyen = currentQuyen === 0 ? 1 : 0;
    try {
      const response = await fetch('http://localhost:5000/api/change-role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tai_khoan, quyen: newQuyen }),
      });
      const data = await response.json();
      if (data.success) {
        // Update the user's role in the local state
        setUsers(users.map(user => 
          user.tai_khoan === tai_khoan ? { ...user, quyen: newQuyen } : user
        ));
        alert('Quyền đã được cập nhật thành công');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error changing role:', error);
      alert('Đã xảy ra lỗi khi cập nhật quyền');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.tai_khoan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="manage-role-container">
      <h2>Quản lý quyền</h2>
      <div className="search-container-role">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input-role"
        />
      </div>
      <table className="user-table-role">
        <thead>
          <tr>
            <th>Tên tài khoản</th>
            <th>Quyền hiện tại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.tai_khoan}>
              <td>{user.tai_khoan}</td>
              <td>{user.quyen === 0 ? 'Khách' : 'Nhân viên'}</td>
              <td>
                <button onClick={() => handleRoleChange(user.tai_khoan, user.quyen)}>
                  Thành {user.quyen === 0 ? 'Nhân viên' : 'Khách'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageRole;