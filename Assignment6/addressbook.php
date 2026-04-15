<?php
require_once "db.php";

$message = "";
$editRecord = null;

if (isset($_GET["delete"])) {
    $deleteId = (int) $_GET["delete"];
    $stmt = mysqli_prepare($con, "DELETE FROM employees WHERE emp_id = ?");

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $deleteId);
        mysqli_stmt_execute($stmt);
        $message = mysqli_stmt_affected_rows($stmt) > 0
            ? "Employee record deleted successfully."
            : "Employee record not found.";
        mysqli_stmt_close($stmt);
    } else {
        $message = "Unable to prepare delete query.";
    }
}

if (isset($_GET["edit"])) {
    $editId = (int) $_GET["edit"];
    $stmt = mysqli_prepare(
        $con,
        "SELECT emp_id, emp_name, department, designation, email, phone, salary, joining_date, city, address FROM employees WHERE emp_id = ?"
    );

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $editId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $editRecord = mysqli_fetch_assoc($result);
        mysqli_stmt_close($stmt);

        if (!$editRecord) {
            $message = "Employee record not found.";
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["save_employee"])) {
    $empId = trim($_POST["emp_id"] ?? "");
    $name = trim($_POST["emp_name"] ?? "");
    $department = trim($_POST["department"] ?? "");
    $designation = trim($_POST["designation"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $salary = trim($_POST["salary"] ?? "");
    $joiningDate = trim($_POST["joining_date"] ?? "");
    $city = trim($_POST["city"] ?? "");
    $address = trim($_POST["address"] ?? "");
    $mode = $_POST["mode"] ?? "add";

    if (
        $empId === "" || $name === "" || $department === "" || $designation === "" ||
        $email === "" || $phone === "" || $salary === "" || $joiningDate === "" ||
        $city === "" || $address === ""
    ) {
        $message = "Please fill in all fields.";
    } else {
        if ($mode === "edit") {
            $originalId = (int) ($_POST["original_id"] ?? 0);
            $stmt = mysqli_prepare(
                $con,
                "UPDATE employees SET emp_id = ?, emp_name = ?, department = ?, designation = ?, email = ?, phone = ?, salary = ?, joining_date = ?, city = ?, address = ? WHERE emp_id = ?"
            );

            if ($stmt) {
                mysqli_stmt_bind_param(
                    $stmt,
                    "isssssdsssi",
                    $empId,
                    $name,
                    $department,
                    $designation,
                    $email,
                    $phone,
                    $salary,
                    $joiningDate,
                    $city,
                    $address,
                    $originalId
                );

                if (mysqli_stmt_execute($stmt)) {
                    $message = "Employee record updated successfully.";
                    $editRecord = null;
                } else {
                    $message = "Unable to update employee record.";
                }

                mysqli_stmt_close($stmt);
            } else {
                $message = "Unable to prepare update query.";
            }
        } else {
            $stmt = mysqli_prepare(
                $con,
                "INSERT INTO employees (emp_id, emp_name, department, designation, email, phone, salary, joining_date, city, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            );

            if ($stmt) {
                mysqli_stmt_bind_param(
                    $stmt,
                    "isssssdsss",
                    $empId,
                    $name,
                    $department,
                    $designation,
                    $email,
                    $phone,
                    $salary,
                    $joiningDate,
                    $city,
                    $address
                );

                if (mysqli_stmt_execute($stmt)) {
                    $message = "Employee record added successfully.";
                } else {
                    $message = "Unable to add employee. Make sure Employee ID is unique.";
                }

                mysqli_stmt_close($stmt);
            } else {
                $message = "Unable to prepare insert query.";
            }
        }
    }
}

$employees = mysqli_query(
    $con,
    "SELECT emp_id, emp_name, department, designation, email, phone, salary, joining_date, city, address FROM employees ORDER BY emp_id"
);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Data Management</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="page-shell">
        <header class="hero">
            <div>
                <p class="eyebrow">PHP + MySQL CRUD Project</p>
                <h1>Employee Database Management</h1>
                <p class="hero-copy">Add employee details, view saved records, and update or remove them from one clean dashboard.</p>
            </div>
            <div class="hero-badge">
                <span><?php echo $employees ? mysqli_num_rows($employees) : 0; ?></span>
                <small>Total Employees</small>
            </div>
        </header>

        <?php if ($message !== ""): ?>
            <div class="message"><?php echo htmlspecialchars($message); ?></div>
        <?php endif; ?>

        <section class="panel">
            <div class="panel-head">
                <div>
                    <h2><?php echo $editRecord ? "Edit Employee" : "Add New Employee"; ?></h2>
                    <p>Fill in the employee information and submit it to save in the database.</p>
                </div>
            </div>

            <form method="post" action="" id="employee-form" class="employee-form">
                <input type="hidden" name="mode" value="<?php echo $editRecord ? "edit" : "add"; ?>">
                <input type="hidden" name="original_id" value="<?php echo htmlspecialchars($editRecord["emp_id"] ?? ""); ?>">

                <div class="form-grid">
                    <div class="field">
                        <label for="emp_id">Employee ID</label>
                        <input type="number" id="emp_id" name="emp_id" value="<?php echo htmlspecialchars($editRecord["emp_id"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="emp_name">Employee Name</label>
                        <input type="text" id="emp_name" name="emp_name" value="<?php echo htmlspecialchars($editRecord["emp_name"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="department">Department</label>
                        <input type="text" id="department" name="department" value="<?php echo htmlspecialchars($editRecord["department"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="designation">Designation</label>
                        <input type="text" id="designation" name="designation" value="<?php echo htmlspecialchars($editRecord["designation"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($editRecord["email"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="phone">Phone Number</label>
                        <input type="text" id="phone" name="phone" value="<?php echo htmlspecialchars($editRecord["phone"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="salary">Salary</label>
                        <input type="number" step="0.01" id="salary" name="salary" value="<?php echo htmlspecialchars($editRecord["salary"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="joining_date">Joining Date</label>
                        <input type="date" id="joining_date" name="joining_date" value="<?php echo htmlspecialchars($editRecord["joining_date"] ?? ""); ?>" required>
                    </div>
                    <div class="field">
                        <label for="city">City</label>
                        <input type="text" id="city" name="city" value="<?php echo htmlspecialchars($editRecord["city"] ?? ""); ?>" required>
                    </div>
                    <div class="field field-wide">
                        <label for="address">Address</label>
                        <input type="text" id="address" name="address" value="<?php echo htmlspecialchars($editRecord["address"] ?? ""); ?>" required>
                    </div>
                </div>

                <div class="actions">
                    <button class="btn" type="submit" name="save_employee">
                        <?php echo $editRecord ? "Update Employee" : "Add Employee"; ?>
                    </button>
                    <button class="btn btn-secondary" type="reset" id="clear-form">Clear Form</button>
                    <?php if ($editRecord): ?>
                        <a class="link-btn" href="addressbook.php">Cancel Edit</a>
                    <?php endif; ?>
                </div>
            </form>
        </section>

        <section class="panel">
            <div class="panel-head">
                <div>
                    <h2>Employee Records</h2>
                    <p>The details you enter are shown below. Use the action buttons to edit or delete any row.</p>
                </div>
            </div>

            <div class="table-wrap">
                <table class="data-table">
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Salary</th>
                        <th>Joining Date</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    <?php if ($employees && mysqli_num_rows($employees) > 0): ?>
                        <?php while ($row = mysqli_fetch_assoc($employees)): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($row["emp_id"]); ?></td>
                                <td><?php echo htmlspecialchars($row["emp_name"]); ?></td>
                                <td><?php echo htmlspecialchars($row["department"]); ?></td>
                                <td><?php echo htmlspecialchars($row["designation"]); ?></td>
                                <td><?php echo htmlspecialchars($row["email"]); ?></td>
                                <td><?php echo htmlspecialchars($row["phone"]); ?></td>
                                <td><?php echo htmlspecialchars(number_format((float) $row["salary"], 2)); ?></td>
                                <td><?php echo htmlspecialchars($row["joining_date"]); ?></td>
                                <td><?php echo htmlspecialchars($row["city"]); ?></td>
                                <td><?php echo htmlspecialchars($row["address"]); ?></td>
                                <td class="action-cell">
                                    <a class="link-btn" href="addressbook.php?edit=<?php echo urlencode($row["emp_id"]); ?>">Edit</a>
                                    <a class="link-btn btn-delete" href="addressbook.php?delete=<?php echo urlencode($row["emp_id"]); ?>" data-delete-link="true">Delete</a>
                                </td>
                            </tr>
                        <?php endwhile; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="11" class="empty-state">No employee records available. Add your first employee above.</td>
                        </tr>
                    <?php endif; ?>
                </table>
            </div>
        </section>
    </div>

    <script src="script.js"></script>
</body>
</html>
