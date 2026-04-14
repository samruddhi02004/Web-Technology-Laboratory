CREATE DATABASE IF NOT EXISTS ebook_db;
USE ebook_db;

CREATE TABLE IF NOT EXISTS ebookshop (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(255) NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    book_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(100) NOT NULL DEFAULT 'Other'
);

INSERT INTO ebookshop (book_title, book_author, book_price, quantity, category)
VALUES
    ('Clean Code', 'Robert C. Martin', 45.99, 12, 'Technology'),
    ('The Alchemist', 'Paulo Coelho', 19.99, 20, 'Fiction'),
    ('Atomic Habits', 'James Clear', 24.50, 15, 'Self-Help');
