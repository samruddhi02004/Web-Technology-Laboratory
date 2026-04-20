package com.taskmanagement.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanagement.dto.EmployeeDTO;
import com.taskmanagement.dto.EmployeeDetailsDTO;
import com.taskmanagement.service.EmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
@Tag(name = "Employee Management", description = "APIs for managing employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    @Operation(summary = "Create a new employee", description = "Add a new employee to the system")
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO createdEmployee = employeeService.createEmployee(employeeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @GetMapping
    @Operation(summary = "Get all employees", description = "Retrieve all employees with pagination")
    public ResponseEntity<Page<EmployeeDTO>> getAllEmployees(Pageable pageable) {
        Page<EmployeeDTO> employees = employeeService.getAllEmployees(pageable);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID", description = "Retrieve a specific employee by ID")
    public ResponseEntity<EmployeeDTO> getEmployeeById(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/{id}/details")
    @Operation(summary = "Get employee details", description = "Retrieve detailed information about an employee including all tasks")
    public ResponseEntity<EmployeeDetailsDTO> getEmployeeDetails(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        EmployeeDetailsDTO details = employeeService.getEmployeeDetailsById(id);
        return ResponseEntity.ok(details);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update employee", description = "Update an existing employee's information")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long id,
            @Valid @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee = employeeService.updateEmployee(id, employeeDTO);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete employee", description = "Remove an employee from the system")
    public ResponseEntity<Void> deleteEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search employees", description = "Search employees by name or email")
    public ResponseEntity<Page<EmployeeDTO>> searchEmployees(
            @Parameter(description = "Search term") @RequestParam String searchTerm,
            Pageable pageable) {
        Page<EmployeeDTO> employees = employeeService.searchEmployees(searchTerm, pageable);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/department/{department}")
    @Operation(summary = "Get employees by department", description = "Retrieve all employees in a specific department")
    public ResponseEntity<Page<EmployeeDTO>> getEmployeesByDepartment(
            @Parameter(description = "Department name") @PathVariable String department,
            Pageable pageable) {
        Page<EmployeeDTO> employees = employeeService.getEmployeesByDepartment(department, pageable);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/role/{role}")
    @Operation(summary = "Get employees by role", description = "Retrieve all employees with a specific role")
    public ResponseEntity<?> getEmployeesByRole(
            @Parameter(description = "Employee role (ADMIN/EMPLOYEE)") @PathVariable String role) {
        var employees = employeeService.getEmployeesByRole(role);
        return ResponseEntity.ok(employees);
    }
}
