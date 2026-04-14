package com.ebook.dao;

import java.sql.*;
import java.util.*;

import com.ebook.model.Book;

public class BookDAO {

    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/ebook_db?useSSL=false&serverTimezone=UTC";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "";

    private static final String INSERT_BOOK_SQL =
            "INSERT INTO ebookshop (book_title, book_author, book_price, quantity, category) VALUES (?, ?, ?, ?, ?)";
    private static final String SELECT_BOOK_BY_ID_SQL =
            "SELECT book_id, book_title, book_author, book_price, quantity, category FROM ebookshop WHERE book_id = ?";
    private static final String UPDATE_BOOK_SQL =
            "UPDATE ebookshop SET book_title = ?, book_author = ?, book_price = ?, quantity = ?, category = ? WHERE book_id = ?";
    private static final String DELETE_BOOK_SQL = "DELETE FROM ebookshop WHERE book_id = ?";
    private static final String SELECT_ALL_BOOKS_SQL =
            "SELECT book_id, book_title, book_author, book_price, quantity, category FROM ebookshop ORDER BY book_id DESC LIMIT ? OFFSET ?";
    private static final String TOTAL_RECORDS_SQL = "SELECT COUNT(*) FROM ebookshop";
    private static final String SEARCH_BOOKS_SQL =
            "SELECT book_id, book_title, book_author, book_price, quantity, category FROM ebookshop " +
            "WHERE book_title LIKE ? OR book_author LIKE ? ORDER BY book_id DESC LIMIT ? OFFSET ?";
    private static final String TOTAL_SEARCH_RECORDS_SQL =
            "SELECT COUNT(*) FROM ebookshop WHERE book_title LIKE ? OR book_author LIKE ?";

    protected Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found.", e);
        }
        return DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD);
    }

    public void insertBook(Book book) throws SQLException {
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(INSERT_BOOK_SQL)) {

            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
            statement.setBigDecimal(3, book.getPrice());
            statement.setInt(4, book.getQuantity());
            statement.setString(5, book.getCategory());
            statement.executeUpdate();
        }
    }

    public Book getBook(int id) {
        Book book = null;

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(SELECT_BOOK_BY_ID_SQL)) {

            statement.setInt(1, id);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    book = mapBook(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return book;
    }

    public boolean updateBook(Book book) throws SQLException {
        boolean rowUpdated;

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(UPDATE_BOOK_SQL)) {

            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
            statement.setBigDecimal(3, book.getPrice());
            statement.setInt(4, book.getQuantity());
            statement.setString(5, book.getCategory());
            statement.setInt(6, book.getId());
            rowUpdated = statement.executeUpdate() > 0;
        }

        return rowUpdated;
    }

    public boolean deleteBook(int id) throws SQLException {
        boolean rowDeleted;

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(DELETE_BOOK_SQL)) {

            statement.setInt(1, id);
            rowDeleted = statement.executeUpdate() > 0;
        }

        return rowDeleted;
    }

    public List<Book> selectAllBooks(int limit, int offset) {
        List<Book> books = new ArrayList<>();

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(SELECT_ALL_BOOKS_SQL)) {

            statement.setInt(1, limit);
            statement.setInt(2, offset);

            try (ResultSet rs = statement.executeQuery()) {
                while (rs.next()) {
                    books.add(mapBook(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return books;
    }

    public int getTotalRecords() {
        int totalRecords = 0;

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(TOTAL_RECORDS_SQL);
             ResultSet rs = statement.executeQuery()) {

            if (rs.next()) {
                totalRecords = rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return totalRecords;
    }

    public List<Book> searchBooks(String keyword, int limit, int offset) {
        List<Book> books = new ArrayList<>();
        String searchPattern = "%" + keyword + "%";

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(SEARCH_BOOKS_SQL)) {

            statement.setString(1, searchPattern);
            statement.setString(2, searchPattern);
            statement.setInt(3, limit);
            statement.setInt(4, offset);

            try (ResultSet rs = statement.executeQuery()) {
                while (rs.next()) {
                    books.add(mapBook(rs));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return books;
    }

    public int getTotalSearchRecords(String keyword) {
        int totalRecords = 0;
        String searchPattern = "%" + keyword + "%";

        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(TOTAL_SEARCH_RECORDS_SQL)) {

            statement.setString(1, searchPattern);
            statement.setString(2, searchPattern);

            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    totalRecords = rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return totalRecords;
    }

    private Book mapBook(ResultSet rs) throws SQLException {
        int id = rs.getInt("book_id");
        String title = rs.getString("book_title");
        String author = rs.getString("book_author");
        java.math.BigDecimal price = rs.getBigDecimal("book_price");
        int quantity = rs.getInt("quantity");
        String category = rs.getString("category");

        return new Book(id, title, author, price, quantity, category);
    }
}
