// src/components/SavedBooks/SavedBooks.jsx

import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Trash2 } from 'lucide-react';
import BookList from '../BookList/BookList';
import bookService from '../../services/bookService';
import './SavedBooks.css';

const SavedBooks = ({ onMessage }) => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch saved books on component mount
  useEffect(() => {
    fetchSavedBooks();
  }, []);

  const fetchSavedBooks = async () => {
    try {
      setLoading(true);
      const books = await bookService.getSavedBooks();
      setSavedBooks(books);
    } catch (error) {
      console.error('Error fetching saved books:', error);
      if (onMessage) {
        onMessage('Failed to load saved books.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchSavedBooks();
      if (onMessage) {
        onMessage('Saved books refreshed successfully!', 'success');
      }
    } catch (error) {
      console.error('Error refreshing saved books:', error);
      if (onMessage) {
        onMessage('Failed to refresh saved books.', 'error');
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      setSavedBooks(prev => prev.filter(book => book.id !== bookId));
      if (onMessage) {
        onMessage('Book deleted successfully!', 'success');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      if (onMessage) {
        onMessage('Failed to delete book.', 'error');
      }
    }
  };

  const handleClearAll = async () => {
    if (savedBooks.length === 0) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to delete all ${savedBooks.length} saved books? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    try {
      // Delete all books one by one
      for (const book of savedBooks) {
        await bookService.deleteBook(book.id);
      }
      setSavedBooks([]);
      if (onMessage) {
        onMessage('All saved books have been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error clearing all books:', error);
      if (onMessage) {
        onMessage('Failed to delete all books.', 'error');
      }
      // Refresh to get current state
      fetchSavedBooks();
    }
  };

  return (
    <div className="saved-books">
      <div className="saved-books-header">
        <div className="header-title">
          <Heart className="header-icon" />
          <h2 className="title">Your Library</h2>
          <span className="book-count">({savedBooks.length} books)</span>
        </div>
        
        <div className="header-actions">
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="action-btn refresh-btn"
            title="Refresh saved books"
          >
            <RefreshCw className={`btn-icon ${refreshing ? 'spinning' : ''}`} />
            Refresh
          </button>
          
          {savedBooks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="action-btn clear-btn"
              title="Delete all saved books"
            >
              <Trash2 className="btn-icon" />
              Clear All
            </button>
          )}
        </div>
      </div>

      <BookList
        books={savedBooks}
        onDeleteBook={handleDeleteBook}
        title=""
        emptyMessage="No saved books yet. Search for books and save your favorites!"
        emptyIcon={Heart}
        loading={loading}
        showDeleteButton={true}
      />
    </div>
  );
};

export default SavedBooks;