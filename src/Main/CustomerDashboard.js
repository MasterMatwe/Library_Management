import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import './CustomerDashboard.css';
import { Outlet, useLocation } from 'react-router-dom';

function CustomerDashboard() {
  const [books, setBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/customer-dashboard') {
      fetchBooks();
    }
  }, [location]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books-kh');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBorrowBook = async (bookId) => {
    const confirmBorrow = window.confirm("Bạn chắc chắn muốn mượn cuốn sách này?");
    if (confirmBorrow) {
      const user = JSON.parse(localStorage.getItem('user'));
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setMonth(today.getMonth() + 1); // Set due date to one month later

      try {
        const response = await fetch('http://localhost:5000/api/themuon-kh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_khach_hang: user.id,
            id_sach_muon: bookId,
            ngay_muon: today.toISOString().split('T')[0],
            ngay_tra_du_dinh: dueDate.toISOString().split('T')[0],
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert('Mượn sách thành công!');
          fetchBooks(); // Refresh the book list
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error borrowing book:', error);
      }
    }
  };

  return (
    <div className="customer-dashboard">
      <Sidebar />
      <div className="main-content">
        <Outlet />
        {location.pathname === '/customer-dashboard' && (
          <>
            <h1>Customer Dashboard</h1>
            <div className="table-box">
              <h2>Book List</h2>
              <div className="book-table-container">
                <table className="book-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Author</th>
                      <th>Publication Year</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.ten_sach}</td>
                        <td>{book.mo_ta}</td>
                        <td>{book.tac_gia}</td>
                        <td>{book.nam_xuat_ban}</td>
                        <td>{book.trang_thai}</td>
                        <td>
                          {book.trang_thai === 'Chưa có người mượn' && (
                            <button onClick={() => handleBorrowBook(book.id)}>Mượn</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;