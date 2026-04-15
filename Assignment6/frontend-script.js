const form = document.getElementById("employee-form");
const tableBody = document.getElementById("employee-table-body");
const employeeCount = document.getElementById("employee-count");
const formTitle = document.getElementById("form-title");
const saveButton = document.getElementById("save-btn");
const editIndexField = document.getElementById("edit-index");
const clearButton = document.getElementById("clear-btn");

const employees = [];

function getFormData() {
    return {
        empId: document.getElementById("emp-id").value.trim(),
        empName: document.getElementById("emp-name").value.trim(),
        department: document.getElementById("department").value.trim(),
        designation: document.getElementById("designation").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        salary: document.getElementById("salary").value.trim(),
        joiningDate: document.getElementById("joining-date").value,
        city: document.getElementById("city").value.trim(),
        address: document.getElementById("address").value.trim()
    };
}

function fillForm(employee, index) {
    document.getElementById("emp-id").value = employee.empId;
    document.getElementById("emp-name").value = employee.empName;
    document.getElementById("department").value = employee.department;
    document.getElementById("designation").value = employee.designation;
    document.getElementById("email").value = employee.email;
    document.getElementById("phone").value = employee.phone;
    document.getElementById("salary").value = employee.salary;
    document.getElementById("joining-date").value = employee.joiningDate;
    document.getElementById("city").value = employee.city;
    document.getElementById("address").value = employee.address;
    editIndexField.value = index;
    formTitle.textContent = "Edit Employee";
    saveButton.textContent = "Update Employee";
}

function resetFormState() {
    editIndexField.value = "";
    formTitle.textContent = "Add Employee";
    saveButton.textContent = "Save Employee";
}

function renderTable() {
    employeeCount.textContent = employees.length;

    if (employees.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="11" class="empty-state">No employee records yet.</td></tr>';
        return;
    }

    tableBody.innerHTML = employees.map((employee, index) => `
        <tr>
            <td>${employee.empId}</td>
            <td>${employee.empName}</td>
            <td>${employee.department}</td>
            <td>${employee.designation}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.salary}</td>
            <td>${employee.joiningDate}</td>
            <td>${employee.city}</td>
            <td>${employee.address}</td>
            <td>
                <div class="action-stack">
                    <button class="action-link edit" type="button" onclick="editEmployee(${index})">Edit</button>
                    <button class="action-link delete" type="button" onclick="deleteEmployee(${index})">Delete</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function validateEmployee(employee) {
    if (employee.empName.length < 3) {
        alert("Employee name should be at least 3 characters long.");
        return false;
    }

    if (!/^[0-9]{10}$/.test(employee.phone)) {
        alert("Phone number should contain exactly 10 digits.");
        return false;
    }

    if (Number(employee.salary) <= 0) {
        alert("Salary should be greater than 0.");
        return false;
    }

    return true;
}

window.editEmployee = function (index) {
    fillForm(employees[index], index);
    window.scrollTo({ top: 0, behavior: "smooth" });
};

window.deleteEmployee = function (index) {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) {
        return;
    }

    employees.splice(index, 1);
    renderTable();
    form.reset();
    resetFormState();
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const employee = getFormData();
    if (!validateEmployee(employee)) {
        return;
    }

    const editIndex = editIndexField.value;

    if (editIndex === "") {
        employees.push(employee);
    } else {
        employees[Number(editIndex)] = employee;
    }

    renderTable();
    form.reset();
    resetFormState();
});

clearButton.addEventListener("click", () => {
    window.setTimeout(() => {
        resetFormState();
    }, 0);
});

renderTable();
