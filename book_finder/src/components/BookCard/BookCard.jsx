// src/components/BookCard/BookCard.jsx

import React, { useState } from 'react';
import { Heart, Calendar, User, Trash2 } from 'lucide-react';
import './BookCard.css';

const BookCard = ({ 
  book, 
  onSave, 
  onDelete,
  isSaved = false, 
  showSaveButton = true,
  showDeleteButton = false 
}) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave(book);
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await onDelete(book.id);
    } catch (error) {
      console.error('Error deleting book:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getCoverUrl = () => {
    if (imageError) return null;

    if (book.coverUrl) {
      return book.coverUrl; // already a full URL
    } else if (book.cover_url) {
      return book.cover_url; // alternate field
    } else if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    console.log(book);
    

    return null;
  };

  return (
    <div className="book-card">
      <div className="book-card-content">
        <div className="book-cover">
          {getCoverUrl() ? (
            <img
              src={getCoverUrl()}
              alt={book.title}
              className="cover-image"
              onError={handleImageError}
            />
          ) : (
            <div className="cover-placeholder">
              <div className="placeholder-text">No Cover</div>
            </div>
          )}
        </div>
        
        <div className="book-info">
          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>
          
          <div className="book-meta">
            {book.author && (
              <div className="meta-item">
                <User className="meta-icon" />
                <span>{book.author}</span>
              </div>
            )}
            
            {book.publishYear || book.firstPublishYear ? (
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>{book.publishYear || book.firstPublishYear}</span>
              </div>
            ) : null}
            
            {book.publisher && (
              <div className="meta-item">
                <span className="meta-label">Publisher:</span>
                <span>{book.publisher}</span>
              </div>
            )}
            
            {book.isbn && (
              <div className="meta-item">
                <span className="meta-label">ISBN:</span>
                <span>{book.isbn}</span>
              </div>
            )}
          </div>

          <div className="book-actions">
            {showSaveButton && !isSaved && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="action-button save-button"
              >
                <Heart className="button-icon" />
                {saving ? 'Saving...' : 'Save Book'}
              </button>
            )}
            
            {isSaved && !showSaveButton && (
              <div className="saved-indicator">
                <Heart className="saved-icon" />
                <span>Saved</span>
              </div>
            )}
            
            {showDeleteButton && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="action-button delete-button"
              >
                <Trash2 className="button-icon" />
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
