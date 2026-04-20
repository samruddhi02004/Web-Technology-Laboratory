// ===========================
// TASK MANAGEMENT
// ===========================

let currentTaskPage = 0;
let editingTaskId = null;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('tasks-container')) {
        loadTasks();
        loadEmployeesForSelect();
        setupTaskForm();
    }
});

// Load and display tasks
async function loadTasks(page = 0) {
    try {
        currentTaskPage = page;
        const response = await apiCall(`/tasks?page=${page}&size=${pageSize}`);
        
        const container = document.getElementById('tasks-container');
        container.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(task => {
                const taskCard = createTaskCard(task);
                container.appendChild(taskCard);
            });

            renderPagination(response.totalPages, page, 'tasks-pagination', loadTasks);
        } else {
            container.innerHTML = '<div class="text-center"><p>No tasks found</p></div>';
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        showNotification('Failed to load tasks', 'error');
    }
}

// Create task card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card ${task.isOverdue ? 'overdue' : ''}`;
    
    const statusClass = task.status.toLowerCase();
    const priorityLabel = {1: 'Low', 2: 'Medium', 3: 'High'}[task.priority] || 'Medium';
    
    card.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <span class="badge ${statusClass}">${task.status}</span>
        </div>
        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
        <div class="task-meta">
            <div class="task-employee">
                <i class="fas fa-user"></i> ${task.employeeName}
            </div>
            <div style="font-size: 0.8rem; background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">
                ${priorityLabel} Priority
            </div>
        </div>
        <div class="task-meta" style="border: none; padding: 0;">
            <div class="task-deadline ${task.isOverdue ? 'overdue' : ''}">
                <i class="fas fa-calendar"></i> ${formatDate(task.deadline)}
                ${task.isOverdue ? '<i class="fas fa-exclamation-triangle" style="margin-left: 0.5rem;"></i>' : ''}
            </div>
        </div>
        <div class="task-actions">
            <button class="btn btn-edit" onclick="editTask(${task.taskId})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-danger" onclick="deleteTask(${task.taskId})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    return card;
}

// Search tasks
const debounceTaskSearch = debounce(async function(searchTerm) {
    if (searchTerm.length === 0) {
        loadTasks();
        return;
    }

    try {
        const response = await apiCall(`/tasks/search?searchTerm=${encodeURIComponent(searchTerm)}&page=0&size=${pageSize}`);
        const container = document.getElementById('tasks-container');
        container.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(task => {
                const taskCard = createTaskCard(task);
                container.appendChild(taskCard);
            });
        } else {
            container.innerHTML = '<div class="text-center"><p>No tasks found</p></div>';
        }
    } catch (error) {
        console.error('Error searching tasks:', error);
        showNotification('Search failed', 'error');
    }
}, 300);

// Filter by status
async function filterByStatus(status) {
    if (!status) {
        loadTasks();
        return;
    }

    try {
        const response = await apiCall(`/tasks/status/${status}?page=0&size=${pageSize}`);
        const container = document.getElementById('tasks-container');
        container.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(task => {
                const taskCard = createTaskCard(task);
                container.appendChild(taskCard);
            });
        } else {
            container.innerHTML = '<div class="text-center"><p>No tasks found</p></div>';
        }
    } catch (error) {
        console.error('Error filtering tasks:', error);
        showNotification('Failed to filter tasks', 'error');
    }
}

// Filter by employee
async function filterByEmployee(employeeId) {
    if (!employeeId) {
        loadTasks();
        return;
    }

    try {
        const response = await apiCall(`/tasks/employee/${employeeId}?page=0&size=${pageSize}`);
        const container = document.getElementById('tasks-container');
        container.innerHTML = '';

        if (response.content && response.content.length > 0) {
            response.content.forEach(task => {
                const taskCard = createTaskCard(task);
                container.appendChild(taskCard);
            });
        } else {
            container.innerHTML = '<div class="text-center"><p>No tasks found</p></div>';
        }
    } catch (error) {
        console.error('Error filtering tasks:', error);
        showNotification('Failed to filter tasks', 'error');
    }
}

// Load employees for select
async function loadEmployeesForSelect() {
    try {
        const response = await apiCall('/employees?page=0&size=1000');
        const select = document.getElementById('task-employee');
        
        if (select && response.content) {
            response.content.forEach(employee => {
                const option = document.createElement('option');
                option.value = employee.id;
                option.textContent = employee.name;
                select.appendChild(option);
            });
        }

        const employeeFilter = document.getElementById('employee-filter');
        if (employeeFilter && response.content) {
            response.content.forEach(employee => {
                const option = document.createElement('option');
                option.value = employee.id;
                option.textContent = employee.name;
                employeeFilter.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading employees:', error);
    }
}

// Setup task form
function setupTaskForm() {
    const form = document.getElementById('task-form');
    if (form) {
        form.addEventListener('submit', saveTask);
    }
}

// Open add task modal
function openAddTaskModal() {
    editingTaskId = null;
    document.getElementById('task-modal-title').textContent = 'Create Task';
    document.getElementById('task-form').reset();
    document.getElementById('task-priority').value = '2';
    document.getElementById('task-status').value = 'PENDING';
    document.getElementById('task-modal').classList.add('active');
}

// Close task modal
function closeTaskModal() {
    document.getElementById('task-modal').classList.remove('active');
    editingTaskId = null;
}

// Edit task
async function editTask(taskId) {
    try {
        const task = await apiCall(`/tasks/${taskId}`);
        editingTaskId = taskId;
        
        document.getElementById('task-modal-title').textContent = 'Edit Task';
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-employee').value = task.employeeId;
        document.getElementById('task-deadline').value = formatDateTimeInput(task.deadline);
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-status').value = task.status;
        
        document.getElementById('task-modal').classList.add('active');
    } catch (error) {
        console.error('Error loading task:', error);
        showNotification('Failed to load task', 'error');
    }
}

// Save task
async function saveTask(e) {
    e.preventDefault();
    
    const taskData = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        employeeId: parseInt(document.getElementById('task-employee').value),
        deadline: new Date(document.getElementById('task-deadline').value).toISOString(),
        priority: parseInt(document.getElementById('task-priority').value),
        status: document.getElementById('task-status').value
    };

    try {
        if (editingTaskId) {
            await apiCall(`/tasks/${editingTaskId}`, 'PUT', taskData);
            showNotification('Task updated successfully', 'success');
        } else {
            await apiCall('/tasks', 'POST', taskData);
            showNotification('Task created successfully', 'success');
        }
        
        closeTaskModal();
        loadTasks();
    } catch (error) {
        console.error('Error saving task:', error);
        showNotification('Failed to save task: ' + (error.message || JSON.stringify(error)), 'error');
        
        // Display field errors if available
        if (error.fieldErrors && Array.isArray(error.fieldErrors)) {
            error.fieldErrors.forEach(fieldError => {
                const errorEl = document.getElementById(`task-${fieldError.field}-error`);
                if (errorEl) {
                    errorEl.textContent = fieldError.message;
                }
            });
        }
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirmDelete('Are you sure you want to delete this task?')) return;

    try {
        await apiCall(`/tasks/${taskId}`, 'DELETE');
        showNotification('Task deleted successfully', 'success');
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Failed to delete task', 'error');
    }
}
