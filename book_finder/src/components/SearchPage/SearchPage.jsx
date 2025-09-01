// src/components/SearchPage/SearchPage.jsx

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchBar from '../SearchBar/SearchBar';
import BookList from '../BookList/BookList';
import bookService from '../../services/bookService';
import './SearchPage.css';

const SearchPage = ({ onMessage }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setCurrentQuery(query);
      setHasSearched(true);
      
      const results = await bookService.searchBooks(query);
      setSearchResults(results);
      
      if (results.length === 0) {
        if (onMessage) {
          onMessage('No books found. Try a different search term.', 'info');
        }
      } else {
        if (onMessage) {
          onMessage(`Found ${results.length} books!`, 'success');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      if (onMessage) {
        onMessage('Failed to search books. Please check if the backend is running.', 'error');
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBook = async (book) => {
    try {
      await bookService.saveBook(book);
      if (onMessage) {
        onMessage('Book saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Save error:', error);
      if (onMessage) {
        onMessage('Failed to save book. Please try again.', 'error');
      }
    }
  };

  const getEmptyMessage = () => {
    if (!hasSearched) {
      return "Search for books by title to see results here";
    }
    return `No books found for "${currentQuery}". Try different keywords or check the spelling.`;
  };

  return (
    <div className="search-page">
      <div className="search-section">
        <div className="search-intro">
          <Search className="search-page-icon" />
          <h2 className="search-title">Discover Books</h2>
          <p className="search-subtitle">
            Search through millions of books and save your favorites
          </p>
        </div>
        
        <SearchBar 
          onSearch={handleSearch} 
          loading={loading}
          placeholder="Search for books by title, author, or keyword..."
        />
      </div>

      <div className="results-section">
        <BookList
          books={searchResults}
          onSaveBook={handleSaveBook}
          title={hasSearched ? `Search Results` : 'Ready to Search'}
          emptyMessage={getEmptyMessage()}
          emptyIcon={Search}
          loading={loading}
          showDeleteButton={false}
        />
      </div>

      {/* Search Tips */}
      {!hasSearched && (
        <div className="search-tips">
          <h3 className="tips-title">Search Tips:</h3>
          <ul className="tips-list">
            <li>Try searching by book title: "Harry Potter"</li>
            <li>Search by author name: "Stephen King"</li>
            <li>Use simple keywords for better results</li>
            <li>Check spelling if no results are found</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;