// BookController.java
package com.example.backend.controller;

import com.example.backend.model.Book;
import com.example.backend.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // 🔹 Search books from OpenLibrary API
    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title) {
        return bookService.searchBooks(title);
    }

    // 🔹 Save book to DB
    @PostMapping("/save")
    public Book saveBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    // 🔹 Get all saved books
    @GetMapping("/saved")
    public List<Book> getSavedBooks() {
        return bookService.getAllBooks();
    }

    // 🔹 Delete book by ID
    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    @GetMapping("/test-api")
    public String testApi() {
        bookService.testApiCall();
        return "Check console logs";
    }
}
