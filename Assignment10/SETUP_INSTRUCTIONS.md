# Employee Task Management System - Setup & Run Instructions

## 📋 Project Overview
Production-grade Employee Task Management System built with:
- **Backend**: Spring Boot 3.2.0 (Java 17)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Database**: MySQL 8.0+
- **API Documentation**: Swagger/OpenAPI

---

## 🔧 Prerequisites

Before setting up, ensure you have:
- Java 17 or higher
- Maven 3.8+
- MySQL Server 8.0+
- Git

### Verify Installations:
```bash
java -version
mvn -version
mysql --version
```

---

## 🗄️ Step 1: Database Setup

### Option A: MySQL Command Line

1. **Open MySQL CLI**:
```bash
mysql -u root -p
```

2. **Create Database and Tables**:
```sql
-- Copy and paste content from database-schema.sql file
-- Or run:
source /path/to/database-schema.sql
```

### Option B: Using SQL File
```bash
mysql -u root -p < database-schema.sql
```

### Verify Database Creation:
```sql
USE task_management_db;
SHOW TABLES;
```

---

## 🚀 Step 2: Configure Application

### Update Database Connection
Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/task_management_db
    username: root              # Change if different
    password: root              # Change to your MySQL password
```

---

## 📦 Step 3: Build the Project

Navigate to project directory and run:

```bash
# Clean and build
mvn clean package

# Or build without tests
mvn clean package -DskipTests
```

---

## ▶️ Step 4: Run the Application

### Option A: Maven
```bash
mvn spring-boot:run
```

### Option B: JAR File
```bash
java -jar target/employee-task-management-1.0.0.jar
```

### Expected Output:
```
...
Started TaskManagementApplication in X.XXX seconds
```

---

## 🌐 Step 5: Access the Application

Once the server is running:

- **Dashboard**: http://localhost:8080/api/index.html
- **API Docs (Swagger)**: http://localhost:8080/api/swagger-ui.html
- **API Base URL**: http://localhost:8080/api

---

## 📊 Default Credentials & Sample Data

Sample employees are auto-loaded with the database script:

| Email | Name | Department | Role |
|-------|------|-----------|------|
| john.smith@company.com | John Smith | Engineering | ADMIN |
| sarah.johnson@company.com | Sarah Johnson | Product Management | EMPLOYEE |
| michael.chen@company.com | Michael Chen | Engineering | EMPLOYEE |

---

## 🔌 API Endpoints

### Employee Management

#### Create Employee
```http
POST /api/employees
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@company.com",
  "department": "Engineering"
}
```

#### Get All Employees
```http
GET /api/employees?page=0&size=10
```

#### Get Employee by ID
```http
GET /api/employees/{id}
```

#### Get Employee Details with Tasks
```http
GET /api/employees/{id}/details
```

#### Update Employee
```http
PUT /api/employees/{id}
Content-Type: application/json

{
  "name": "Jane Doe Updated",
  "email": "jane.doe.updated@company.com",
  "department": "Sales"
}
```

#### Delete Employee
```http
DELETE /api/employees/{id}
```

#### Search Employees
```http
GET /api/employees/search?searchTerm=jane&page=0&size=10
```

#### Filter by Department
```http
GET /api/employees/department/Engineering?page=0&size=10
```

#### Filter by Role
```http
GET /api/employees/role/EMPLOYEE
```

---

### Task Management

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "New Feature Development",
  "description": "Develop new dashboard features",
  "employeeId": 1,
  "deadline": "2024-05-31T17:00:00",
  "priority": 2,
  "status": "PENDING"
}
```

#### Get All Tasks
```http
GET /api/tasks?page=0&size=10
```

#### Get Task by ID
```http
GET /api/tasks/{taskId}
```

#### Update Task
```http
PUT /api/tasks/{taskId}
Content-Type: application/json

{
  "title": "Updated Task",
  "status": "IN_PROGRESS",
  "priority": 3
}
```

#### Delete Task
```http
DELETE /api/tasks/{taskId}
```

#### Get Tasks by Employee
```http
GET /api/tasks/employee/{employeeId}?page=0&size=10
```

#### Get Tasks by Status
```http
GET /api/tasks/status/PENDING?page=0&size=10
```

Valid statuses: `PENDING`, `IN_PROGRESS`, `COMPLETED`

#### Get Overdue Tasks
```http
GET /api/tasks/overdue
```

#### Search Tasks
```http
GET /api/tasks/search?searchTerm=feature&page=0&size=10
```

#### Get Tasks by Date Range
```http
GET /api/tasks/date-range?status=PENDING&startDate=2024-05-01T00:00:00&endDate=2024-05-31T23:59:59&page=0&size=10
```

---

## 🧪 Testing with Postman

1. Import the API endpoints listed above
2. Use the sample data from database-schema.sql
3. Test CRUD operations on both Employee and Task resources

### Example Test Flow:
1. Create an employee: POST /api/employees
2. Get the created employee: GET /api/employees/{id}
3. Create a task for that employee: POST /api/tasks
4. Update the task: PUT /api/tasks/{taskId}
5. Get overdue tasks: GET /api/tasks/overdue
6. Delete the task: DELETE /api/tasks/{taskId}
7. Delete the employee: DELETE /api/employees/{id}

---

## 🎨 Frontend Features

### Dashboard
- **Stats Cards**: Total employees, tasks, pending tasks, overdue tasks
- **Recent Tasks**: Display latest 5 tasks
- **Department Distribution**: Show employees by department
- **Task Status Overview**: Visual distribution of task statuses

### Employee Management
- Add new employees
- View all employees with pagination
- Search employees by name/email
- Filter by department
- View employee details with task summary
- Edit employee information
- Delete employees

### Task Management
- Create tasks and assign to employees
- View all tasks with filtering options
- Filter by status (Pending/In Progress/Completed)
- Filter by assigned employee
- Search tasks by title or description
- Edit task details and status
- Delete tasks
- Overdue task highlighting

### Key UI Features
- Responsive design (works on desktop, tablet, mobile)
- Modern gradient sidebar navigation
- Interactive cards with hover effects
- Data tables with sorting
- Modal dialogs for forms
- Color-coded status badges
- Real-time notifications
- Pagination for large datasets
- Search with debouncing

---

## 📝 Logging Configuration

Logging is configured in `application.yml`:

```yaml
logging:
  level:
    root: INFO
    com.taskmanagement: DEBUG
    org.hibernate.SQL: DEBUG
```

Logs are output to console. To add file logging, update:
```yaml
logging:
  file:
    name: logs/app.log
```

---

## 🔍 Project Structure

```
task-management/
├── src/
│   ├── main/
│   │   ├── java/com/taskmanagement/
│   │   │   ├── TaskManagementApplication.java
│   │   │   ├── controller/
│   │   │   │   ├── EmployeeController.java
│   │   │   │   └── TaskController.java
│   │   │   ├── service/
│   │   │   │   ├── EmployeeService.java
│   │   │   │   ├── TaskService.java
│   │   │   │   └── impl/
│   │   │   ├── repository/
│   │   │   │   ├── EmployeeRepository.java
│   │   │   │   └── TaskRepository.java
│   │   │   ├── entity/
│   │   │   │   ├── Employee.java
│   │   │   │   └── Task.java
│   │   │   ├── dto/
│   │   │   │   ├── EmployeeDTO.java
│   │   │   │   └── TaskDTO.java
│   │   │   ├── exception/
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   └── ApiErrorResponse.java
│   │   │   └── config/
│   │   │       └── OpenAPIConfig.java
│   │   ├── resources/
│   │   │   ├── application.yml
│   │   │   ├── templates/
│   │   │   │   ├── index.html
│   │   │   │   ├── employees.html
│   │   │   │   └── tasks.html
│   │   │   └── static/
│   │   │       ├── css/
│   │   │       │   └── styles.css
│   │   │       └── js/
│   │   │           ├── app.js
│   │   │           ├── employees.js
│   │   │           └── tasks.js
│   └── test/
├── pom.xml
├── database-schema.sql
└── README.md
```

---

## 🐛 Troubleshooting

### MySQL Connection Error
```
Error: Access denied for user 'root'@'localhost'
```
**Solution**: Update database credentials in `application.yml`

### Port Already in Use
```
Port 8080 is already in use
```
**Solution**: Change server port in `application.yml`:
```yaml
server:
  port: 8081
```

### Database Not Found
```
Unknown database 'task_management_db'
```
**Solution**: Run database-schema.sql to create database

### Maven Build Error
```
mvn: command not found
```
**Solution**: Install Maven or add to PATH

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Swagger/OpenAPI](https://swagger.io/)

---

## ✅ Verification Checklist

After setup, verify:
- [ ] MySQL database created successfully
- [ ] Application starts without errors
- [ ] Dashboard loads at http://localhost:8080/api/index.html
- [ ] Sample data is present (8 employees, 8 tasks)
- [ ] Can create a new employee
- [ ] Can create a new task
- [ ] Can update employee details
- [ ] Can update task status
- [ ] Can delete employee and task
- [ ] Swagger UI accessible at http://localhost:8080/api/swagger-ui.html
- [ ] Overdue tasks are highlighted correctly

---

## 📞 Support

For issues or questions:
1. Check the logs in console
2. Verify database connection
3. Ensure all prerequisite software is installed
4. Review application.yml configuration

---

**Happy Task Managing! 🎯**
