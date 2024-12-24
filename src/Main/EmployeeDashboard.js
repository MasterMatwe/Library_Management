import React, { useEffect, useState } from 'react';
import './EmployeeDashboard.css';
import LoanCards from '../Components/LoanCards';
import Sidebar from '../Components/Sidebar';
import { Outlet,useLocation } from 'react-router-dom';
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ ten_sach: '', mo_ta: '', tac_gia: '', nam_xuat_ban: '' });
  const [editBook, setEditBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('books');
  const location = useLocation();
  useEffect(() => {
    fetchBooks();
    if (location.pathname === '/employee-dashboard') {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    }
  }, [location]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      const data = await response.json();
      if (data.success) {
        setBooks(data.books);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      const data = await response.json();
      if (data.success) {
        alert('Book added successfully!');
        setNewBook({ ten_sach: '', mo_ta: '', tac_gia: '', nam_xuat_ban: '' });
        setShowAddForm(false);
        fetchBooks();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleEditBook = (id) => {
    const bookToEdit = books.find(book => book.id === id);
    setEditBook(bookToEdit);
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/books/${editBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBook),
      });
      const data = await response.json();
      if (data.success) {
        alert('Book updated successfully!');
        setEditBook(null);
        fetchBooks();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        alert('Book deleted successfully!');
        fetchBooks();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="employee-dashboard">
      <Sidebar />
      <div className="content-box">
        <Outlet />
        {location.pathname === '/employee-dashboard' && (
          <>
            {user && (
              <div style={{ color: '#DCCAA8' }}>
                <p>Employee: {user.name}</p>
                <p>Employee ID: {user.id}</p>
              </div>
            )}

            <div className="tab-navigation">
              <button onClick={() => setActiveTab('books')}>Books</button>
              <button onClick={() => setActiveTab('loanCards')}>Loan Cards</button>
            </div>

            {activeTab === 'books' && (
              <div>
                <button 
                  className="add-book-button"
                  onClick={() => setShowAddForm(!showAddForm)}>
                  {showAddForm ? 'Cancel' : 'Add New Book'}
                </button>

                {showAddForm && (
                  <form onSubmit={handleAddBook}>
                    <input
                      type="text"
                      placeholder="Tên sách"
                      value={newBook.ten_sach}
                      onChange={(e) => setNewBook({ ...newBook, ten_sach: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Mô tả"
                      value={newBook.mo_ta}
                      onChange={(e) => setNewBook({ ...newBook, mo_ta: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tác giả"
                      value={newBook.tac_gia}
                      onChange={(e) => setNewBook({ ...newBook, tac_gia: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Năm xuất bản"
                      value={newBook.nam_xuat_ban}
                      onChange={(e) => setNewBook({ ...newBook, nam_xuat_ban: e.target.value })}
                      required
                    />
                    <button type="submit">Add Book</button>
                  </form>
                )}

                {editBook && (
                  <form onSubmit={handleUpdateBook}>
                    <input
                      type="text"
                      placeholder="Tên sách"
                      value={editBook.ten_sach}
                      onChange={(e) => setEditBook({ ...editBook, ten_sach: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Mô tả"
                      value={editBook.mo_ta}
                      onChange={(e) => setEditBook({ ...editBook, mo_ta: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Tác giả"
                      value={editBook.tac_gia}
                      onChange={(e) => setEditBook({ ...editBook, tac_gia: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Năm xuất bản"
                      value={editBook.nam_xuat_ban}
                      onChange={(e) => setEditBook({ ...editBook, nam_xuat_ban: e.target.value })}
                      required
                    />
                    <button type="submit">Update Book</button>
                  </form>
                )}

                <ul>
                  {books.map((book) => (
                    <mu key={book.id}>
                      {book.ten_sach} - {book.tac_gia} ({book.nam_xuat_ban})
                      <div>
                        <button onClick={() => handleEditBook(book.id)}>Edit</button>
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                      </div>
                    </mu>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'loanCards' && (
              <LoanCards user={user} />
            )}
          </>
        )}
      </div>
    </div>
  );

}

export default EmployeeDashboard;