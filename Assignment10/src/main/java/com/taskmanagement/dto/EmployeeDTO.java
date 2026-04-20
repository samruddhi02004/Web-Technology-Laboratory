package com.taskmanagement.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class EmployeeDTO {
    private Long id;
    private String name;
    private String email;
    private String department;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer taskCount;

    public EmployeeDTO() {}

    public EmployeeDTO(Long id, String name, String email, String department, String role, LocalDateTime createdAt, LocalDateTime updatedAt, Integer taskCount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.taskCount = taskCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @NotBlank(message = "Employee name is required")
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @NotBlank(message = "Department is required")
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Integer getTaskCount() { return taskCount; }
    public void setTaskCount(Integer taskCount) { this.taskCount = taskCount; }
}
