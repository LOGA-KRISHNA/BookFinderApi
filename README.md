# 📚 Book Search Application

A full-stack web application built with **React.js** frontend and **Spring Boot** backend that allows users to search for books using the Open Library API and save their favorites to a MySQL database.

## 🌟 Features

- **🔍 Book Search**: Search for books by title using Open Library API
- **💾 Save Books**: Save your favorite books to MySQL database
- **📖 View Saved Books**: Browse your collection of saved books
- **🗑️ Delete Books**: Remove books from your saved collection
- **🔧 Smart Search**: Automatic correction of common misspellings (e.g., "Harry Porter" → "Harry Potter")
- **📱 Responsive Design**: Modern React UI that works on all devices
- **⚡ Real-time Updates**: Instant UI updates when saving/deleting books

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 2.7+
- **Database**: MySQL with JPA/Hibernate
- **API Integration**: Open Library API
- **Error Handling**: Comprehensive error handling and logging
- **CORS**: Configured for React frontend

### Frontend (React.js)
- **Framework**: React 18+ with functional components
- **HTTP Client**: Axios/Fetch API for backend communication
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: CSS Modules / Styled Components / Tailwind CSS
- **Build Tool**: Create React App or Vite

## 📋 Prerequisites

### Backend
- **Java 11+**
- **Maven 3.6+**
- **MySQL 8.0+**

### Frontend
- **Node.js 16+**
- **npm 8+** or **yarn 1.22+**

### Other
- **Internet Connection** (for Open Library API)
- 
## 🌐 Hosted App

You can access the live application here:
[https://red-pebble-0362a9c00.1.azurestaticapps.net/](https://red-pebble-0362a9c00.1.azurestaticapps.net/)
## 🚀 Quick Start

### 1. Database Setup

**Create MySQL Database**:
```sql
CREATE DATABASE book-finder;



```

### 2. Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LOGA-KRISHNA/BookFinderApi.git
   cd book-search-app
   ```

2. **Configure database** (`src/main/resources/application.properties`)
   

3. **Add MySQL dependency** (in `pom.xml`)
  

4. **Run the Spring Boot application**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Verify backend is running**
   - API Base URL: `http://localhost:8080/api/books`
   - Health Check: `http://localhost:8080/api/books/test-api` 

### 3. Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   # or create new React app if not exists
   npx create-react-app frontend
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`

## 📡 API Endpoints

### Base URL: `http://localhost:8080/api/books`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/search?title={title}` | Search books by title | - | Array of Book objects |
| POST | `/save` | Save a book to database | Book object | Saved Book object |
| GET | `/saved` | Get all saved books | - | Array of saved Book objects |
| DELETE | `/delete/{id}` | Delete a saved book | - | 204 No Content |

### Book Object Structure

```json
{
  "id": 1,
  "title": "Harry Potter and the Philosopher's Stone",
  "author": "J. K. Rowling",
  "coverUrl": "https://covers.openlibrary.org/b/id/12345-M.jpg",
  "firstPublishYear": 1997,
  "editionCount": 150
}
```

