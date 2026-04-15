<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "employee_management";

$con = mysqli_connect($host, $username, $password, $database);

if (!$con) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>
