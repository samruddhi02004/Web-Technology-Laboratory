const employeeForm = document.getElementById("employee-form");
const clearButton = document.getElementById("clear-form");
const deleteLinks = document.querySelectorAll('[data-delete-link="true"]');

if (employeeForm) {
    employeeForm.addEventListener("submit", (event) => {
        const salary = document.getElementById("salary");
        const phone = document.getElementById("phone");
        const name = document.getElementById("emp_name");

        if (name.value.trim().length < 3) {
            event.preventDefault();
            alert("Employee name should be at least 3 characters long.");
            name.focus();
            return;
        }

        if (!/^[0-9]{10}$/.test(phone.value.trim())) {
            event.preventDefault();
            alert("Phone number should contain exactly 10 digits.");
            phone.focus();
            return;
        }

        if (Number(salary.value) <= 0) {
            event.preventDefault();
            alert("Salary should be greater than 0.");
            salary.focus();
        }
    });
}

if (clearButton) {
    clearButton.addEventListener("click", () => {
        window.setTimeout(() => {
            const name = document.getElementById("emp_name");
            if (name) {
                name.focus();
            }
        }, 0);
    });
}

deleteLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee record?");
        if (!confirmed) {
            event.preventDefault();
        }
    });
});
