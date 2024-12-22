import React, { useEffect, useState } from 'react';

function LoanCards({ user }) {
  const [loanCards, setLoanCards] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredLoanCards, setFilteredLoanCards] = useState([]);

  useEffect(() => {
    fetchLoanCards();
  }, []);

  const fetchLoanCards = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/themuon'); // Fetch all loan cards
      const data = await response.json();
      if (data.success) {
        setLoanCards(data.loanCards);
        setFilteredLoanCards(data.loanCards); // Initialize filtered loan cards
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching loan cards:', error);
    }
  };

  const handleSearch = () => {
    // Filter loan cards based on the search ID
    const filtered = loanCards.filter(card => card.id.toString().includes(searchId));
    setFilteredLoanCards(filtered);
  };

  const handleConfirmReturn = async (loanCardId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/confirm-return/${loanCardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ngay_tra_thuc_te: new Date().toISOString().split('T')[0] }), // Ghi lại ngày hiện tại
      });
      const data = await response.json();
      if (data.success) {
        alert('Ngày trả đã được xác nhận thành công!');
        fetchLoanCards(); // Làm mới danh sách thẻ mượn
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thẻ mượn:', error);
    }
  };

  const handleAssignEmployee = async (loanCardId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/themuon/${loanCardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_nhan_vien: user.id }), // Ghi ID nhân viên từ user
      });
      const data = await response.json();
      if (data.success) {
        alert('ID nhân viên đã được cập nhật thành công!');
        fetchLoanCards(); // Làm mới danh sách thẻ mượn
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật ID nhân viên:', error);
    }
  };

  return (
    <div>
      {/* Display Employee Information */}
      <div className="employee-info">
        <h2>Employee Information</h2>
        <p><strong>Name:</strong> {user.ten}</p> {/* Assuming user object has 'ten' for employee name */}
        <p><strong>ID:</strong> {user.id}</p> {/* Assuming user object has 'id' for employee ID */}
      </div>

      <h2>Loan Cards</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Loan ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Customer ID</th>
            <th>Book ID</th>
            <th>Employee ID</th>
            <th>Loan Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Action</th> {/* New column for action */}
          </tr>
        </thead>
        <tbody>
          {filteredLoanCards.map(card => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.id_khach_hang}</td>
              <td>{card.id_sach_muon}</td>
              <td>{card.id_nhan_vien || 'Chưa có ID'}</td>
              <td>{card.ngay_muon}</td>
              <td>{card.ngay_tra_du_dinh}</td>
              <td>{card.ngay_tra_thuc_te || 'Chưa trả'}</td>
              <td>
                {card.id_nhan_vien ? (
                  <button onClick={() => handleConfirmReturn(card.id)}>Xác nhận trả</button>
                ) : (
                  <button onClick={() => handleAssignEmployee(card.id)}>Xác nhận nhân viên</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanCards;