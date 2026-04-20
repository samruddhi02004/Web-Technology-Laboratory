# Employee Task Management System

A **production-grade**, full-stack Employee Task Management System built with Spring Boot, MySQL, and modern frontend technologies.

## 🎯 Features

### Core Functionality
- ✅ **Employee Management**: Create, Read, Update, Delete employees
- ✅ **Task Management**: Assign, track, and manage employee tasks
- ✅ **Dashboard**: Real-time statistics and overview
- ✅ **Search & Filter**: Advanced search and filtering capabilities
- ✅ **Pagination**: Efficient data handling with pagination
- ✅ **Overdue Tasks**: Automatic highlighting of overdue tasks

### Technical Features
- ✅ **Clean Architecture**: Layered architecture (Controller → Service → Repository)
- ✅ **REST API**: Full REST API with proper HTTP methods
- ✅ **Exception Handling**: Global exception handling with meaningful responses
- ✅ **Validation**: Input validation with custom error messages
- ✅ **Logging**: Comprehensive logging using SLF4J
- ✅ **API Documentation**: Swagger/OpenAPI integration
- ✅ **Responsive UI**: Mobile-friendly, modern design
- ✅ **Transaction Management**: Proper transaction handling with Spring @Transactional

### Advanced Features
- Role-based access (Admin/Employee)
- Task priority levels
- Task status tracking (Pending/In Progress/Completed)
- Employee task summary with statistics
- Department-based filtering
- Date range filtering for tasks
- Database views for complex queries

---

## 🏗️ Architecture

### Backend Architecture

```
┌─────────────────────────────────────────┐
│         HTTP Requests (REST API)         │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Controller Layer                  │
│ - EmployeeController                     │
│ - TaskController                         │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Service Layer                    │
│ - EmployeeService                        │
│ - TaskService                            │
│ (Business Logic & Validation)            │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Repository Layer                 │
│ - EmployeeRepository                     │
│ - TaskRepository                         │
│ (Data Access using Spring Data JPA)     │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│         Database Layer                   │
│ - MySQL 8.0+                             │
│ - JPA/Hibernate ORM                      │
└─────────────────────────────────────────┘
```

### Database Design

```
┌─────────────────────────┐
│      employees          │
├─────────────────────────┤
│ id (PK)                 │
│ name                    │
│ email (UNIQUE)          │
│ department              │
│ role                    │
│ created_at              │
│ updated_at              │
└──────────────┬──────────┘
               │ (1:N)
               │
┌──────────────▼──────────┐
│      tasks              │
├─────────────────────────┤
│ task_id (PK)            │
│ title                   │
│ description             │
│ deadline                │
│ status                  │
│ priority                │
│ employee_id (FK)        │
│ created_at              │
│ updated_at              │
└─────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend Framework** | Spring Boot | 3.2.0 |
| **Java** | OpenJDK | 17+ |
| **Database** | MySQL | 8.0+ |
| **ORM** | Hibernate/JPA | 6.2+ |
| **Build Tool** | Maven | 3.8+ |
| **Frontend** | HTML5/CSS3/JavaScript | ES6+ |
| **API Docs** | Springdoc OpenAPI | 2.0.2 |

---

## 📋 API Endpoints Summary

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| GET | `/api/employees/{id}/details` | Get employee with tasks |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/search` | Search employees |
| GET | `/api/employees/department/{dept}` | Filter by department |
| GET | `/api/employees/role/{role}` | Filter by role |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{taskId}` | Get task by ID |
| PUT | `/api/tasks/{taskId}` | Update task |
| DELETE | `/api/tasks/{taskId}` | Delete task |
| GET | `/api/tasks/employee/{empId}` | Get tasks by employee |
| GET | `/api/tasks/status/{status}` | Filter by status |
| GET | `/api/tasks/overdue` | Get overdue tasks |
| GET | `/api/tasks/search` | Search tasks |
| GET | `/api/tasks/date-range` | Filter by date range |

---

## 🎨 UI Components

### Dashboard
- **Stats Cards**: Employee count, task metrics
- **Recent Tasks Table**: Latest tasks with quick actions
- **Department Distribution**: Visual department breakdown
- **Task Status Overview**: Status distribution

### Employee Management
- **Employee Table**: Sortable, filterable employee list
- **Add/Edit Modal**: Form for employee CRUD
- **Employee Details Modal**: View employee with task summary
- **Search & Filter**: Real-time search and department filter

### Task Management
- **Task Cards**: Kanban-style task cards
- **Status Badges**: Color-coded task status
- **Priority Indicators**: Task priority levels
- **Add/Edit Modal**: Comprehensive task form
- **Overdue Highlighting**: Visual warning for overdue tasks

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+

### Setup

1. **Clone/Download Project**
```bash
cd /path/to/Assignment-10
```

2. **Create Database**
```bash
mysql -u root -p < database-schema.sql
```

3. **Update Configuration** (if needed)
Edit `src/main/resources/application.yml`:
```yaml
datasource:
  url: jdbc:mysql://localhost:3306/task_management_db
  username: root
  password: your_password
```

4. **Build Project**
```bash
mvn clean package
```

5. **Run Application**
```bash
mvn spring-boot:run
```

6. **Access Application**
- **UI**: http://localhost:8080/api/index.html
- **Swagger**: http://localhost:8080/api/swagger-ui.html

---

## 💡 Code Examples

### Creating an Employee
```javascript
// JavaScript
const employeeData = {
  name: "John Doe",
  email: "john@company.com",
  department: "Engineering"
};

fetch('/api/employees', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(employeeData)
})
.then(res => res.json())
.then(data => console.log('Employee created:', data));
```

### Creating a Task
```javascript
const taskData = {
  title: "Develop API",
  description: "Build REST API endpoints",
  employeeId: 1,
  deadline: "2024-05-31T17:00:00",
  priority: 3,
  status: "PENDING"
};

fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(taskData)
})
.then(res => res.json())
.then(data => console.log('Task created:', data));
```

### Updating Task Status
```javascript
const updateData = {
  status: "IN_PROGRESS"
};

fetch('/api/tasks/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updateData)
})
.then(res => res.json())
.then(data => console.log('Task updated:', data));
```

---

## 🔐 Error Handling

All API errors follow a consistent format:

```json
{
  "timestamp": "2024-05-15T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid input parameters",
  "path": "/api/employees",
  "fieldErrors": [
    {
      "field": "email",
      "message": "Email should be valid",
      "rejectedValue": "invalid-email"
    }
  ]
}
```

### HTTP Status Codes
- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `204 No Content`: Successful deletion
- `400 Bad Request`: Invalid input or validation error
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource (e.g., email)
- `500 Internal Server Error`: Server error

---

## 🧪 Testing

### Manual Testing
1. Use the web UI at http://localhost:8080/api/index.html
2. Test all CRUD operations
3. Test filters and search

### API Testing with Curl

```bash
# Create employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@company.com","department":"Sales"}'

# Get all employees
curl http://localhost:8080/api/employees

# Create task
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Task 1","employeeId":1,"deadline":"2024-05-31T17:00:00","priority":2}'

# Get overdue tasks
curl http://localhost:8080/api/tasks/overdue

# Update task status
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"COMPLETED"}'

# Delete employee
curl -X DELETE http://localhost:8080/api/employees/1
```

---

## 📊 Database Views

### Employee Task Summary
```sql
SELECT * FROM employee_task_summary;
```

### Overdue Tasks
```sql
SELECT * FROM overdue_tasks;
```

---

## 📈 Performance Considerations

1. **Database Indexing**: Indexes on frequently queried columns
2. **Pagination**: Large datasets paginated (10 records/page default)
3. **Lazy Loading**: Related entities loaded on demand
4. **Connection Pooling**: Efficient database connection management
5. **Debounced Search**: Search requests debounced to prevent excessive API calls

---

## 🔄 Transaction Management

All service methods are marked with `@Transactional`:
- Read operations: `@Transactional(readOnly = true)`
- Write operations: `@Transactional`

This ensures data consistency and proper exception handling.

---

## 📝 Logging

Configured via `application.yml`:

```yaml
logging:
  level:
    com.taskmanagement: DEBUG          # Application logs
    org.hibernate.SQL: DEBUG            # SQL queries
    org.hibernate.type: TRACE           # Query parameters
```

Logs show:
- API requests/responses
- Database operations
- Business logic flow
- Error details

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MySQL connection denied | Verify username/password in application.yml |
| Port 8080 already in use | Change `server.port` in application.yml |
| Database not found | Run database-schema.sql |
| Build fails | Run `mvn clean package -DskipTests` |

---

## 📚 Additional Features & Future Enhancements

- [ ] User authentication & authorization (JWT/OAuth2)
- [ ] Email notifications for task updates
- [ ] Task comments and activity log
- [ ] File attachment support
- [ ] Advanced reporting and analytics
- [ ] Mobile app (React Native/Flutter)
- [ ] Real-time notifications (WebSocket)
- [ ] Task templates and recurring tasks
- [ ] Team collaboration features

---

## 📝 License

This project is provided as-is for educational purposes.

---

## 👨‍💻 Development Notes

### Best Practices Implemented
- ✅ SOLID principles
- ✅ Clean code architecture
- ✅ Proper separation of concerns
- ✅ DRY (Don't Repeat Yourself)
- ✅ Comprehensive exception handling
- ✅ Input validation
- ✅ Secure password storage concepts
- ✅ RESTful API design
- ✅ Database normalization
- ✅ Proper HTTP status codes

### Code Quality
- Production-level code formatting
- Meaningful variable/method names
- Comprehensive comments where needed
- No hardcoded values
- Reusable utility functions
- Proper dependency injection

---

## 📞 Support & Documentation

- **Swagger API Docs**: http://localhost:8080/api/swagger-ui.html
- **Setup Instructions**: See SETUP_INSTRUCTIONS.md
- **Database Schema**: See database-schema.sql

---

**Built with ❤️ for Production Use**
