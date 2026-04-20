package com.taskmanagement.controller;

import java.time.LocalDateTime;
import java.util.List;

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

import com.taskmanagement.dto.TaskDTO;
import com.taskmanagement.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
@Tag(name = "Task Management", description = "APIs for managing tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @Operation(summary = "Create a new task", description = "Assign a task to an employee")
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        TaskDTO createdTask = taskService.createTask(taskDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @GetMapping
    @Operation(summary = "Get all tasks", description = "Retrieve all tasks with pagination")
    public ResponseEntity<Page<TaskDTO>> getAllTasks(Pageable pageable) {
        Page<TaskDTO> tasks = taskService.getAllTasks(pageable);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{taskId}")
    @Operation(summary = "Get task by ID", description = "Retrieve a specific task by ID")
    public ResponseEntity<TaskDTO> getTaskById(
            @Parameter(description = "Task ID") @PathVariable Long taskId) {
        TaskDTO task = taskService.getTaskById(taskId);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{taskId}")
    @Operation(summary = "Update task", description = "Update an existing task")
    public ResponseEntity<TaskDTO> updateTask(
            @Parameter(description = "Task ID") @PathVariable Long taskId,
            @Valid @RequestBody TaskDTO taskDTO) {
        TaskDTO updatedTask = taskService.updateTask(taskId, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    @Operation(summary = "Delete task", description = "Remove a task from the system")
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "Task ID") @PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employee/{employeeId}")
    @Operation(summary = "Get tasks by employee", description = "Retrieve all tasks assigned to a specific employee")
    public ResponseEntity<Page<TaskDTO>> getTasksByEmployee(
            @Parameter(description = "Employee ID") @PathVariable Long employeeId,
            Pageable pageable) {
        Page<TaskDTO> tasks = taskService.getTasksByEmployee(employeeId, pageable);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get tasks by status", description = "Filter tasks by status (PENDING/IN_PROGRESS/COMPLETED)")
    public ResponseEntity<Page<TaskDTO>> getTasksByStatus(
            @Parameter(description = "Task status") @PathVariable String status,
            Pageable pageable) {
        Page<TaskDTO> tasks = taskService.getTasksByStatus(status, pageable);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/search")
    @Operation(summary = "Search tasks", description = "Search tasks by title or description")
    public ResponseEntity<Page<TaskDTO>> searchTasks(
            @Parameter(description = "Search term") @RequestParam String searchTerm,
            Pageable pageable) {
        Page<TaskDTO> tasks = taskService.searchTasks(searchTerm, pageable);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/overdue")
    @Operation(summary = "Get overdue tasks", description = "Retrieve all tasks that have exceeded their deadline")
    public ResponseEntity<List<TaskDTO>> getOverdueTasks() {
        List<TaskDTO> tasks = taskService.getOverdueTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/date-range")
    @Operation(summary = "Get tasks by date range", description = "Retrieve tasks within a specific date range and status")
    public ResponseEntity<Page<TaskDTO>> getTasksByDateRange(
            @Parameter(description = "Task status") @RequestParam String status,
            @Parameter(description = "Start date (ISO format)") @RequestParam LocalDateTime startDate,
            @Parameter(description = "End date (ISO format)") @RequestParam LocalDateTime endDate,
            Pageable pageable) {
        Page<TaskDTO> tasks = taskService.getTasksByDateRange(status, startDate, endDate, pageable);
        return ResponseEntity.ok(tasks);
    }
}
