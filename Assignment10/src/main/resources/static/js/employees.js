// ===========================
// EMPLOYEE MANAGEMENT
// ===========================

let currentEmployeePage = 0;
let editingEmployeeId = null;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('employees-tbody')) {
        loadEmployees();
        loadDepartments();
    }
});

// Load and display employees
async function loadEmployees(page = 0) {
    try {
        currentEmployeePage = page;
        const response = await apiCall(`/employees?page=${page}&size=${pageSize}`);
        
        const tbody = document.getElementById('employees-tbody');
        tbody.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${employee.name}</strong></td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td><span class="badge" style="background-color: #eef2ff; color: #4f46e5;">${employee.taskCount || 0}</span></td>
                    <td>${employee.role}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-edit" onclick="viewEmployeeDetails(${employee.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-edit" onclick="editEmployee(${employee.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.getElementById('employee-count').textContent = response.totalElements;
            renderPagination(response.totalPages, page, 'pagination', loadEmployees);
        } else {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">No employees found</td></tr>';
        }
    } catch (error) {
        console.error('Error loading employees:', error);
        showNotification('Failed to load employees', 'error');
    }
}

// Search employees
const debounceSearch = debounce(async function(searchTerm) {
    if (searchTerm.length === 0) {
        loadEmployees();
        return;
    }

    try {
        const response = await apiCall(`/employees/search?searchTerm=${encodeURIComponent(searchTerm)}&page=0&size=${pageSize}`);
        const tbody = document.getElementById('employees-tbody');
        tbody.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${employee.name}</strong></td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td><span class="badge" style="background-color: #eef2ff; color: #4f46e5;">${employee.taskCount || 0}</span></td>
                    <td>${employee.role}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-edit" onclick="viewEmployeeDetails(${employee.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-edit" onclick="editEmployee(${employee.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">No employees found</td></tr>';
        }
    } catch (error) {
        console.error('Error searching employees:', error);
        showNotification('Search failed', 'error');
    }
}, 300);

// Filter by department
async function filterByDepartment(department) {
    if (!department) {
        loadEmployees();
        return;
    }

    try {
        const response = await apiCall(`/employees/department/${encodeURIComponent(department)}?page=0&size=${pageSize}`);
        const tbody = document.getElementById('employees-tbody');
        tbody.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><strong>${employee.name}</strong></td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td><span class="badge" style="background-color: #eef2ff; color: #4f46e5;">${employee.taskCount || 0}</span></td>
                    <td>${employee.role}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-edit" onclick="viewEmployeeDetails(${employee.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-edit" onclick="editEmployee(${employee.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error filtering employees:', error);
        showNotification('Failed to filter employees', 'error');
    }
}

// Load departments for filter
async function loadDepartments() {
    try {
        const response = await apiCall('/employees?page=0&size=1000');
        const departments = new Set();
        
        if (response.content) {
            response.content.forEach(emp => {
                if (emp.department) departments.add(emp.department);
            });
        }

        const filterSelect = document.getElementById('department-filter');
        if (filterSelect) {
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept;
                option.textContent = dept;
                filterSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading departments:', error);
    }
}

// Open add employee modal
function openAddEmployeeModal() {
    editingEmployeeId = null;
    document.getElementById('modal-title').textContent = 'Add Employee';
    document.getElementById('employee-form').reset();
    document.getElementById('employee-modal').classList.add('active');
}

// Close employee modal
function closeEmployeeModal() {
    document.getElementById('employee-modal').classList.remove('active');
    editingEmployeeId = null;
}

// Edit employee
async function editEmployee(id) {
    try {
        const employee = await apiCall(`/employees/${id}`);
        editingEmployeeId = id;
        
        document.getElementById('modal-title').textContent = 'Edit Employee';
        document.getElementById('employee-name').value = employee.name;
        document.getElementById('employee-email').value = employee.email;
        document.getElementById('employee-department').value = employee.department;
        
        document.getElementById('employee-modal').classList.add('active');
    } catch (error) {
        console.error('Error loading employee:', error);
        showNotification('Failed to load employee', 'error');
    }
}

// Save employee
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('employee-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const employeeData = {
                name: document.getElementById('employee-name').value,
                email: document.getElementById('employee-email').value,
                department: document.getElementById('employee-department').value
            };

            try {
                if (editingEmployeeId) {
                    await apiCall(`/employees/${editingEmployeeId}`, 'PUT', employeeData);
                    showNotification('Employee updated successfully', 'success');
                } else {
                    await apiCall('/employees', 'POST', employeeData);
                    showNotification('Employee added successfully', 'success');
                }
                
                closeEmployeeModal();
                loadEmployees();
            } catch (error) {
                console.error('Error saving employee:', error);
                showNotification('Failed to save employee: ' + (error.message || JSON.stringify(error)), 'error');
                
                // Display field errors if available
                if (error.fieldErrors && Array.isArray(error.fieldErrors)) {
                    error.fieldErrors.forEach(fieldError => {
                        const errorEl = document.getElementById(`${fieldError.field}-error`);
                        if (errorEl) {
                            errorEl.textContent = fieldError.message;
                        }
                    });
                }
            }
        });
    }
});

// View employee details
async function viewEmployeeDetails(id) {
    try {
        const details = await apiCall(`/employees/${id}/details`);
        
        const tasksHtml = details.tasks && details.tasks.length > 0
            ? details.tasks.map(task => `
                <div style="padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                    <strong>${task.title}</strong>
                    <br>
                    <small style="color: #64748b;">Status: ${task.status}</small>
                </div>
            `).join('')
            : '<p style="color: #64748b;">No tasks assigned</p>';

        const content = document.getElementById('employee-details-content');
        content.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div class="detail-value">${details.name}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${details.email}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Department:</div>
                <div class="detail-value">${details.department}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Role:</div>
                <div class="detail-value">${details.role}</div>
            </div>
            <div class="tasks-summary">
                <h4>Task Summary</h4>
                <div class="summary-stats">
                    <div class="summary-stat">
                        <div class="summary-stat-value">${details.taskCount || 0}</div>
                        <div class="summary-stat-label">Total Tasks</div>
                    </div>
                    <div class="summary-stat">
                        <div class="summary-stat-value">${details.completedTaskCount || 0}</div>
                        <div class="summary-stat-label">Completed</div>
                    </div>
                    <div class="summary-stat">
                        <div class="summary-stat-value">${details.pendingTaskCount || 0}</div>
                        <div class="summary-stat-label">Pending</div>
                    </div>
                </div>
                <h4 style="margin-top: 1rem;">Tasks</h4>
                ${tasksHtml}
            </div>
        `;
        
        document.getElementById('employee-details-modal').classList.add('active');
    } catch (error) {
        console.error('Error loading employee details:', error);
        showNotification('Failed to load employee details', 'error');
    }
}

// Close details modal
function closeDetailsModal() {
    document.getElementById('employee-details-modal').classList.remove('active');
}

// Delete employee
async function deleteEmployee(id) {
    if (!confirmDelete('Are you sure you want to delete this employee?')) return;

    try {
        await apiCall(`/employees/${id}`, 'DELETE');
        showNotification('Employee deleted successfully', 'success');
        loadEmployees();
    } catch (error) {
        console.error('Error deleting employee:', error);
        showNotification('Failed to delete employee', 'error');
    }
}

// Add action button styles
const actionButtonStyles = `
    <style>
        .action-buttons {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .action-buttons .btn {
            padding: 0.4rem 0.75rem;
            font-size: 0.8rem;
            white-space: nowrap;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', actionButtonStyles);
