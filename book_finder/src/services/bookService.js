// src/services/bookService.js

const API_BASE_URL = 'https://backendbookfinderapi-e5d2dkgperaef2g5.southindia-01.azurewebsites.net/api/books';

class BookService {
  
  /**
   * Search for books by title
   * @param {string} title - Book title to search for
   * @returns {Promise<Array>} Array of book objects
   */
  async searchBooks(title) {
    try {
      const response = await fetch(`${API_BASE_URL}/search?title=${encodeURIComponent(title)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw new Error('Failed to search books. Please check if the backend is running.');
    }
  }

  /**
   * Save a book to the database
   * @param {Object} book - Book object to save
   * @returns {Promise<Object>} Saved book object
   */
  async saveBook(book) {
    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedBook = await response.json();
      return savedBook;
    } catch (error) {
      console.error('Error saving book:', error);
      throw new Error('Failed to save book. Please try again.');
    }
  }

  /**
   * Get all saved books from the database
   * @returns {Promise<Array>} Array of saved book objects
   */
  async getSavedBooks() {
    try {
      const response = await fetch(`${API_BASE_URL}/saved`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching saved books:', error);
      throw new Error('Failed to load saved books.');
    }
  }

  /**
   * Delete a saved book from the database (optional endpoint)
   * @param {number} bookId - ID of the book to delete
   * @returns {Promise<void>}
   */
  async deleteBook(bookId) {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${bookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book.');
    }
  }

  /**
   * Update API base URL (useful for different environments)
   * @param {string} newBaseUrl - New base URL
   */
  setBaseUrl(newBaseUrl) {
    this.API_BASE_URL = newBaseUrl;
  }
}

// Export singleton instance
const bookService = new BookService();
export default bookService;