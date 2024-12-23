import React, { useState, useEffect } from "react";
import "./giohang.css";

function Giohang() {
  const [loanCards, setLoanCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      fetchLoanCardsWithBookNames(user.id);
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  const fetchLoanCardsWithBookNames = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/themuon/${id}/with-book-names`);
      const data = await response.json();
      if (data.success) {
        setLoanCards(data.loanCards);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error fetching loan cards');
      console.error('Error fetching loan cards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="giohang-container">
      <h2>Your Loan Cards</h2>
      <table className="giohang-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Book Name</th>
            <th>Loan Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {loanCards.map(card => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.ten_sach || 'Unknown'}</td>
              <td>{new Date(card.ngay_muon).toLocaleDateString()}</td>
              <td>{new Date(card.ngay_tra_du_dinh).toLocaleDateString()}</td>
              <td>{card.ngay_tra_thuc_te ? new Date(card.ngay_tra_thuc_te).toLocaleDateString() : 'Not returned yet'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Giohang;