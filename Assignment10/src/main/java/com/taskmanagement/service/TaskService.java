package com.taskmanagement.service;

import com.taskmanagement.dto.TaskDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskService {
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO getTaskById(Long taskId);
    Page<TaskDTO> getAllTasks(Pageable pageable);
    Page<TaskDTO> getTasksByEmployee(Long employeeId, Pageable pageable);
    Page<TaskDTO> getTasksByStatus(String status, Pageable pageable);
    Page<TaskDTO> searchTasks(String searchTerm, Pageable pageable);
    TaskDTO updateTask(Long taskId, TaskDTO taskDTO);
    void deleteTask(Long taskId);
    List<TaskDTO> getOverdueTasks();
    Page<TaskDTO> getTasksByDateRange(String status, LocalDateTime startDate, 
                                       LocalDateTime endDate, Pageable pageable);
}
