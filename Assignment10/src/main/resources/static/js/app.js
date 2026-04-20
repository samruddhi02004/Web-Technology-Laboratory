// ===========================
// COMMON UTILITIES
// ===========================

const API_BASE_URL = '/api';
let currentPage = 0;
let pageSize = 10;

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format datetime
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Format time for datetime input
function formatDateTimeInput(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

// Add styles for notifications
const notificationStyles = `
    <style>
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        }
        
        .notification-success {
            background-color: #22c55e;
        }
        
        .notification-error {
            background-color: #ef4444;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// API Helper
async function apiCall(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const error = await response.json();
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Render pagination
function renderPagination(totalPages, currentPage, paginationElementId, callback) {
    const paginationElement = document.getElementById(paginationElementId);
    paginationElement.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 0;
    prevBtn.onclick = () => {
        if (currentPage > 0) {
            callback(currentPage - 1);
        }
    };
    paginationElement.appendChild(prevBtn);

    // Page numbers
    for (let i = Math.max(0, currentPage - 2); i < Math.min(totalPages, currentPage + 3); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i + 1;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.onclick = () => callback(i);
        paginationElement.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages - 1;
    nextBtn.onclick = () => {
        if (currentPage < totalPages - 1) {
            callback(currentPage + 1);
        }
    };
    paginationElement.appendChild(nextBtn);
}

// Confirm dialog
function confirmDelete(message = 'Are you sure?') {
    return confirm(message);
}
