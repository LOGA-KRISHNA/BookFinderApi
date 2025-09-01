// src/components/BookList/BookList.jsx

import React from 'react';
import { BookOpen } from 'lucide-react';
import BookCard from '../BookCard/BookCard';
import './BookList.css';

const BookList = ({ 
  books = [], 
  onSaveBook, 
  onDeleteBook,
  title = "Books", 
  emptyMessage = "No books found",
  emptyIcon: EmptyIcon = BookOpen,
  loading = false,
  showDeleteButton = false
}) => {

  if (loading) {
    return (
      <div className="book-list">
        <div className="list-header">
          <h2 className="list-title">
            <BookOpen className="title-icon" />
            {title}
          </h2>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading books...</p>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="book-list">
        <div className="list-header">
          <h2 className="list-title">
            <BookOpen className="title-icon" />
            {title} (0)
          </h2>
        </div>
        <div className="empty-state">
          <EmptyIcon className="empty-icon" />
          <p className="empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list">
      <div className="list-header">
        <h2 className="list-title">
          <BookOpen className="title-icon" />
          {title} ({books.length})
        </h2>
      </div>
      
      <div className="books-grid">
        {books.map((book, index) => (
          <BookCard
            key={book.id || `${book.title}-${index}`}
            book={book}
            onSave={onSaveBook}
            onDelete={onDeleteBook}
            isSaved={!!book.id}
            showSaveButton={!book.id}
            showDeleteButton={showDeleteButton && !!book.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;