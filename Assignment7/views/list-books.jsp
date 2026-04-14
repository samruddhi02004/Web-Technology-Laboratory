c<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Book Inventory</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="header-actions">
            <h2>Books List</h2>
            <a href="add" class="btn btn-primary" style="background-color: var(--success);">+ Add New Book</a>
        </div>

        <form action="list" method="get" class="search-bar">
            <input type="text" name="search" placeholder="Search by title or author..." value="${searchQuery}">
            <button type="submit" class="btn btn-primary">Search</button>
            <c:if test="${not empty searchQuery}">
                <a href="list" class="btn btn-primary" style="background-color: var(--text-muted);">Clear</a>
            </c:if>
        </form>

        <div class="card" style="padding: 0;">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="book" items="${bookList}">
                        <tr>
                            <td>${book.id}</td>
                            <td><strong>${book.title}</strong></td>
                            <td>${book.author}</td>
                            <td>$${book.price}</td>
                            <td>${book.quantity}</td>
                            <td>${book.category}</td>
                            <td class="actions">
                                <a href="edit?id=${book.id}" class="btn btn-sm btn-primary">Edit</a>
                                <a href="delete?id=${book.id}" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure you want to delete this book?')">Delete</a>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty bookList}">
                        <tr>
                            <td colspan="7" style="text-align: center; padding: 2rem;">No books found.</td>
                        </tr>
                    </c:if>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <c:if test="${noOfPages > 1}">
            <div class="pagination">
                <c:if test="${currentPage != 1}">
                    <a href="list?page=${currentPage - 1}&search=${searchQuery}">&laquo; Previous</a>
                </c:if>

                <c:forEach begin="1" end="${noOfPages}" var="i">
                    <c:choose>
                        <c:when test="${currentPage eq i}">
                            <a href="#" class="active">${i}</a>
                        </c:when>
                        <c:otherwise>
                            <a href="list?page=${i}&search=${searchQuery}">${i}</a>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>

                <c:if test="${currentPage != noOfPages}">
                    <a href="list?page=${currentPage + 1}&search=${searchQuery}">Next &raquo;</a>
                </c:if>
            </div>
        </c:if>
        
        <div style="margin-top: 2rem; text-align: center;">
            <a href="index.jsp" style="color: var(--text-muted); text-decoration: none;">&larr; Back to Home</a>
        </div>
    </div>
</body>
</html>
