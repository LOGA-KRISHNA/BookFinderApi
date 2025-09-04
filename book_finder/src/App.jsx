// src/App.jsx

import React, { useState } from 'react';
import { BookOpen, Search, Heart } from 'lucide-react';
import SearchPage from './components/SearchPage/SearchPage';
import SavedBooks from './components/SavedBooks/SavedBooks';
import Message from './components/Message/Message';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [message, setMessage] = useState(null);

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
  };

  // Hide message
  const hideMessage = () => {
    setMessage(null);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              <BookOpen className="app-icon" />
              Book Finder
            </h1>
            <p className="app-subtitle">Discover and save your favorite books</p>
          </div>
        </header>

        {/* Message */}
        <Message message={message} onClose={hideMessage} />

        {/* Navigation Tabs */}
        <nav className="navigation">
          <div className="nav-tabs">
            <button
              onClick={() => setActiveTab('search')}
              className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
            >
              <Search className="nav-icon" />
              <span className="nav-text">Search Books</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`nav-tab ${activeTab === 'saved' ? 'active' : ''}`}
            >
              <Heart className="nav-icon" />
              <span className="nav-text">Saved Books</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            {activeTab === 'search' ? (
              <SearchPage onMessage={showMessage} />
            ) : (
              <SavedBooks onMessage={showMessage} />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p className="footer-text">
            Built with React + Spring Boot + Mysql + Azure
          </p>
          <div className="footer-links">
            <a 
              href="https://openlibrary.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              Powered by Open Library
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;