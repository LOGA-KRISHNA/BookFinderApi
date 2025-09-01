// src/components/SearchBar/SearchBar.jsx

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading, placeholder = "Search for books by title..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="search-input"
            disabled={loading}
          />
          {query && (
            <button
              onClick={handleClear}
              className="clear-button"
              type="button"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className="search-button"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;