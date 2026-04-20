-- ===========================
-- EMPLOYEE TASK MANAGEMENT DATABASE SCHEMA
-- ===========================

-- Create database
CREATE DATABASE IF NOT EXISTS task_management_db;
USE task_management_db;

-- ===========================
-- EMPLOYEES TABLE
-- ===========================
CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50) NOT NULL,
    role ENUM('ADMIN', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================
-- TASKS TABLE
-- ===========================
CREATE TABLE tasks (
    task_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    deadline DATETIME NOT NULL,
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    priority INT NOT NULL DEFAULT 1,
    employee_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_task_employee FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_status (status),
    INDEX idx_deadline (deadline)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===========================
-- SAMPLE DATA (OPTIONAL)
-- ===========================

-- Insert sample employees
INSERT INTO employees (name, email, department, role) VALUES
('John Smith', 'john.smith@company.com', 'Engineering', 'ADMIN'),
('Sarah Johnson', 'sarah.johnson@company.com', 'Product Management', 'EMPLOYEE'),
('Michael Chen', 'michael.chen@company.com', 'Engineering', 'EMPLOYEE'),
('Emily Davis', 'emily.davis@company.com', 'Sales', 'EMPLOYEE'),
('James Wilson', 'james.wilson@company.com', 'Engineering', 'EMPLOYEE'),
('Lisa Anderson', 'lisa.anderson@company.com', 'HR', 'EMPLOYEE'),
('David Brown', 'david.brown@company.com', 'Finance', 'EMPLOYEE'),
('Rachel Martinez', 'rachel.martinez@company.com', 'Marketing', 'EMPLOYEE');

-- Insert sample tasks
INSERT INTO tasks (title, description, deadline, status, priority, employee_id) VALUES
('Develop API Endpoints', 'Create REST API endpoints for task management', DATE_ADD(NOW(), INTERVAL 7 DAY), 'IN_PROGRESS', 3, 1),
('Design Database Schema', 'Design normalized database schema for the application', DATE_ADD(NOW(), INTERVAL 5 DAY), 'IN_PROGRESS', 3, 3),
('Write Unit Tests', 'Write comprehensive unit tests for service layer', DATE_ADD(NOW(), INTERVAL 10 DAY), 'PENDING', 2, 5),
('Create Frontend UI', 'Build responsive dashboard interface', DATE_ADD(NOW(), INTERVAL 12 DAY), 'PENDING', 2, 1),
('Client Meeting Preparation', 'Prepare presentation for stakeholder meeting', DATE_ADD(NOW(), INTERVAL 3 DAY), 'IN_PROGRESS', 2, 2),
('Bug Fixes', 'Fix reported issues from production', DATE_ADD(NOW(), INTERVAL 4 DAY), 'PENDING', 3, 3),
('Documentation', 'Write API documentation and user guide', DATE_ADD(NOW(), INTERVAL 8 DAY), 'PENDING', 1, 1),
('Performance Optimization', 'Optimize database queries for faster response', DATE_ADD(NOW(), INTERVAL 6 DAY), 'PENDING', 2, 5);

-- ===========================
-- VIEWS (Optional)
-- ===========================

-- View for employee task summary
CREATE VIEW employee_task_summary AS
SELECT 
    e.id,
    e.name,
    e.email,
    e.department,
    COUNT(t.task_id) as total_tasks,
    SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_tasks,
    SUM(CASE WHEN t.status = 'PENDING' THEN 1 ELSE 0 END) as pending_tasks,
    SUM(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as in_progress_tasks
FROM employees e
LEFT JOIN tasks t ON e.id = t.employee_id
GROUP BY e.id, e.name, e.email, e.department;

-- View for overdue tasks
CREATE VIEW overdue_tasks AS
SELECT 
    t.task_id,
    t.title,
    t.deadline,
    t.priority,
    e.name as employee_name,
    DATEDIFF(NOW(), t.deadline) as days_overdue
FROM tasks t
JOIN employees e ON t.employee_id = e.id
WHERE t.deadline < NOW() AND t.status != 'COMPLETED'
ORDER BY t.deadline ASC;
