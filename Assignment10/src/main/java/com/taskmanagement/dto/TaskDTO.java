package com.taskmanagement.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TaskDTO {
    private Long taskId;
    private String title;
    private String description;
    private LocalDateTime deadline;
    private String status;
    private Long employeeId;
    private String employeeName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer priority;
    private Boolean isOverdue;

    public TaskDTO() {}

    public TaskDTO(Long taskId, String title, String description, LocalDateTime deadline, String status, Long employeeId, String employeeName, LocalDateTime createdAt, LocalDateTime updatedAt, Integer priority, Boolean isOverdue) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.priority = priority;
        this.isOverdue = isOverdue;
    }

    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }

    @NotBlank(message = "Task title is required")
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @NotNull(message = "Deadline is required")
    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @NotNull(message = "Employee ID is required")
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Integer getPriority() { return priority; }
    public void setPriority(Integer priority) { this.priority = priority; }

    public Boolean getIsOverdue() { return isOverdue; }
    public void setIsOverdue(Boolean isOverdue) { this.isOverdue = isOverdue; }
}
