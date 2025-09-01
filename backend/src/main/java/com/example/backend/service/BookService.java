// BookService.java
package com.example.backend.service;

import com.example.backend.Repo.BookRepo;
import com.example.backend.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BookService {

    private static final String OPEN_LIBRARY_API = "https://openlibrary.org/search.json";

    @Autowired
    private BookRepo bookRepo;

    private final RestTemplate restTemplate = new RestTemplate();

    // 🔹 Search books from Open Library API
    public List<Book> searchBooks(String title) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(OPEN_LIBRARY_API)
                    .queryParam("title", title)
                    .toUriString();

            System.out.println("🔍 Searching URL: " + url);

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            System.out.println("📡 API Response: " + response);

            if (response == null) {
                System.out.println("❌ Response is null");
                return new ArrayList<>();
            }

            // Check numFound
            Object numFound = response.get("numFound");
            System.out.println("📊 Number found: " + numFound);

            List<Map<String, Object>> docs = (List<Map<String, Object>>) response.get("docs");
            System.out.println("📚 Docs size: " + (docs != null ? docs.size() : "null"));

            List<Book> results = new ArrayList<>();

            if (docs != null && !docs.isEmpty()) {
                for (Map<String, Object> doc : docs) {
                    Book book = new Book();

                    // Extract title (safe casting)
                    book.setTitle(getStringValue(doc, "title", "Unknown Title"));

                    // Extract author (handle List<String>)
                    book.setAuthor(getAuthorName(doc));

                    // Extract cover URL (handle Integer cover_i)
                    book.setCoverUrl(getCoverUrl(doc));

                    // Extract first publish year (safe integer conversion)
                    book.setFirstPublishYear(getIntegerValue(doc, "first_publish_year", 0));

                    // Extract edition count (safe integer conversion)
                    book.setEditionCount(getIntegerValue(doc, "edition_count", 0));

                    System.out.println("📖 Processing book: " + doc.get("title"));

                    results.add(book);
                }
            } else {
                System.out.println("⚠️ No books found in docs array");
            }

            System.out.println("✅ Returning " + results.size() + " books");
            return results;

        } catch (Exception e) {
            System.err.println("Error fetching books from Open Library API: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>(); // Return empty list on error
        }
    }

    // Helper method to safely extract string values
    private String getStringValue(Map<String, Object> doc, String key, String defaultValue) {
        Object value = doc.get(key);
        return value != null ? value.toString() : defaultValue;
    }

    // Helper method to safely extract author name
    private String getAuthorName(Map<String, Object> doc) {
        Object authorName = doc.get("author_name");
        if (authorName instanceof List) {
            List<?> authorList = (List<?>) authorName;
            if (!authorList.isEmpty()) {
                return authorList.get(0).toString();
            }
        }
        return "Unknown Author";
    }

    // Helper method to safely extract cover URL
    private String getCoverUrl(Map<String, Object> doc) {
        Object coverId = doc.get("cover_i");
        if (coverId != null) {
            return "https://covers.openlibrary.org/b/id/" + coverId + "-M.jpg";
        }
        return null;
    }

    // Helper method to safely extract integer values
    private Integer getIntegerValue(Map<String, Object> doc, String key, Integer defaultValue) {
        Object value = doc.get(key);
        if (value == null) {
            return defaultValue;
        }

        try {
            if (value instanceof Integer) {
                return (Integer) value;
            } else if (value instanceof Number) {
                return ((Number) value).intValue();
            } else {
                return Integer.parseInt(value.toString());
            }
        } catch (NumberFormatException e) {
            System.err.println("Error parsing integer value for key '" + key + "': " + value);
            return defaultValue;
        }
    }

    // 🔹 Save a book to DB
    public Book saveBook(Book book) {
        return bookRepo.save(book);
    }

    // 🔹 Fetch all saved books
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    // 🔹 Delete book by ID
    public void deleteBook(Long id) {
        bookRepo.deleteById(id);
    }

    // 🔧 Test method to debug API calls
    public void testApiCall() {
        System.out.println("🧪 Testing API call...");
        List<Book> results = searchBooks("harry potter");
        System.out.println("🎯 Test results: " + results.size() + " books found");

        if (!results.isEmpty()) {
            Book firstBook = results.get(0);
            System.out.println("📘 First book: " + firstBook.getTitle() + " by " + firstBook.getAuthor());
        }
    }
}