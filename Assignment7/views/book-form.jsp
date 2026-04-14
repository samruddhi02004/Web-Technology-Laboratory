<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title><c:out value="${action eq 'edit' ? 'Edit Book' : 'Add New Book'}" /></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container" style="max-width: 600px;">
        <div class="card">
            <h2><c:out value="${action eq 'edit' ? 'Edit Book' : 'Add New Book'}" /></h2>
            
            <form action="<c:out value="${action eq 'edit' ? 'edit' : 'add'}" />" method="post">
                <c:if test="${action eq 'edit'}">
                    <input type="hidden" name="id" value="${book.id}" />
                </c:if>

                <div class="form-group">
                    <label for="title">Book Title</label>
                    <input type="text" id="title" name="title" value="${book.title}" required placeholder="e.g. The Great Gatsby">
                </div>

                <div class="form-group">
                    <label for="author">Author</label>
                    <input type="text" id="author" name="author" value="${book.author}" required placeholder="e.g. F. Scott Fitzgerald">
                </div>

                <div class="form-group">
                    <label for="price">Price ($)</label>
                    <input type="number" step="0.01" id="price" name="price" value="${book.price}" required placeholder="0.00">
                </div>

                <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" name="quantity" value="${book.quantity}" required placeholder="0">
                </div>

                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" name="category">
                        <option value="Fiction" ${book.category eq 'Fiction' ? 'selected' : ''}>Fiction</option>
                        <option value="Technology" ${book.category eq 'Technology' ? 'selected' : ''}>Technology</option>
                        <option value="Fantasy" ${book.category eq 'Fantasy' ? 'selected' : ''}>Fantasy</option>
                        <option value="History" ${book.category eq 'History' ? 'selected' : ''}>History</option>
                        <option value="Self-Help" ${book.category eq 'Self-Help' ? 'selected' : ''}>Self-Help</option>
                        <option value="Other" ${book.category eq 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1;">
                        <c:out value="${action eq 'edit' ? 'Update Book' : 'Save Book'}" />
                    </button>
                    <a href="list" class="btn" style="flex: 1; border: 1px solid var(--border-color);">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
