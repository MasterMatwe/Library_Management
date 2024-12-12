import React from 'react';
import './App.css';
import Auth from './Components/Auth';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Management System</h1>
      </header>
      <main>
        <Auth />
      </main>
    </div>
  );
}

export default App;