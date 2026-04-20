package com.taskmanagement.dto;

import java.time.LocalDateTime;
import java.util.List;

public class EmployeeDetailsDTO {
    private Long id;
    private String name;
    private String email;
    private String department;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TaskDTO> tasks;
    private Integer taskCount;
    private Integer completedTaskCount;
    private Integer pendingTaskCount;

    public EmployeeDetailsDTO() {}

    public EmployeeDetailsDTO(Long id, String name, String email, String department, String role, LocalDateTime createdAt, LocalDateTime updatedAt, List<TaskDTO> tasks, Integer taskCount, Integer completedTaskCount, Integer pendingTaskCount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tasks = tasks;
        this.taskCount = taskCount;
        this.completedTaskCount = completedTaskCount;
        this.pendingTaskCount = pendingTaskCount;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<TaskDTO> getTasks() { return tasks; }
    public void setTasks(List<TaskDTO> tasks) { this.tasks = tasks; }

    public Integer getTaskCount() { return taskCount; }
    public void setTaskCount(Integer taskCount) { this.taskCount = taskCount; }

    public Integer getCompletedTaskCount() { return completedTaskCount; }
    public void setCompletedTaskCount(Integer completedTaskCount) { this.completedTaskCount = completedTaskCount; }

    public Integer getPendingTaskCount() { return pendingTaskCount; }
    public void setPendingTaskCount(Integer pendingTaskCount) { this.pendingTaskCount = pendingTaskCount; }
}
