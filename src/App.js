import React from 'react';
import './App.css';
import Login from './Components/Login.js';
import Register from './Components/Register.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Management System</h1>
      </header>
      <main>
        <Login />
        <Register />
      </main>
    </div>
  );
}

export default App;