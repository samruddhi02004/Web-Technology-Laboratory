# Employee Data Management

This project is a simple dynamic web application built with PHP and MySQL for an Employee Data Management system.

## Features

- Add a new employee
- Show saved employees below the form
- Edit employee details using the Edit button
- Delete employee details using the Delete button
- Manage richer fields like department, designation, salary, joining date, city, and address
- Uses separate CSS and JavaScript files for better webpage structure

## Files

- `addressbook.php` - single-page employee management app
- `db.php` - database connection file
- `addressbook.sql` - SQL file to create the database and table
- `styles.css` - webpage styling
- `script.js` - form behavior and delete confirmation

## How to Run

1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin and import `addressbook.sql`.
3. Copy this project folder into the `htdocs` directory if needed.
4. Open `http://localhost/PHP and Mysql/addressbook.php` in your browser.

## Database Details

- Database name: `employee_management`
- Table name: `employees`
