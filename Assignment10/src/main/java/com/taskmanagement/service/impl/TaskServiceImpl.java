package com.taskmanagement.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanagement.dto.TaskDTO;
import com.taskmanagement.entity.Employee;
import com.taskmanagement.entity.Task;
import com.taskmanagement.exception.ResourceNotFoundException;
import com.taskmanagement.repository.EmployeeRepository;
import com.taskmanagement.repository.TaskRepository;
import com.taskmanagement.service.TaskService;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public TaskServiceImpl(TaskRepository taskRepository, EmployeeRepository employeeRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Employee employee = employeeRepository.findById(taskDTO.getEmployeeId())
                .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(taskDTO.getEmployeeId()));

        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDeadline(taskDTO.getDeadline());
        task.setStatus(Task.TaskStatus.PENDING);
        task.setEmployee(employee);
        task.setPriority(taskDTO.getPriority() != null ? taskDTO.getPriority() : 1);

        Task savedTask = taskRepository.save(task);
        return mapToDTO(savedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public TaskDTO getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> ResourceNotFoundException.taskNotFound(taskId));
        return mapToDTO(task);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDTO> getAllTasks(Pageable pageable) {
        return taskRepository.findAllTasksOrderByPriorityAndDeadline(pageable)
                .map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDTO> getTasksByEmployee(Long employeeId, Pageable pageable) {
        employeeRepository.findById(employeeId)
                .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(employeeId));
        return taskRepository.findByEmployeeId(employeeId, pageable)
                .map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDTO> getTasksByStatus(String status, Pageable pageable) {
        Task.TaskStatus taskStatus = Task.TaskStatus.valueOf(status.toUpperCase());
        return taskRepository.findByStatus(taskStatus, pageable)
                .map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDTO> searchTasks(String searchTerm, Pageable pageable) {
        return taskRepository.searchTasks(searchTerm, pageable)
                .map(this::mapToDTO);
    }

    @Override
    public TaskDTO updateTask(Long taskId, TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> ResourceNotFoundException.taskNotFound(taskId));

        if (taskDTO.getTitle() != null) {
            task.setTitle(taskDTO.getTitle());
        }
        if (taskDTO.getDescription() != null) {
            task.setDescription(taskDTO.getDescription());
        }
        if (taskDTO.getDeadline() != null) {
            task.setDeadline(taskDTO.getDeadline());
        }
        if (taskDTO.getStatus() != null) {
            task.setStatus(Task.TaskStatus.valueOf(taskDTO.getStatus().toUpperCase()));
        }
        if (taskDTO.getPriority() != null) {
            task.setPriority(taskDTO.getPriority());
        }
        if (taskDTO.getEmployeeId() != null && !taskDTO.getEmployeeId().equals(task.getEmployee().getId())) {
            Employee employee = employeeRepository.findById(taskDTO.getEmployeeId())
                    .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(taskDTO.getEmployeeId()));
            task.setEmployee(employee);
        }

        Task updatedTask = taskRepository.save(task);
        return mapToDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> ResourceNotFoundException.taskNotFound(taskId));
        taskRepository.delete(task);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskDTO> getOverdueTasks() {
        return taskRepository.findOverdueTasks(LocalDateTime.now(), Task.TaskStatus.COMPLETED)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TaskDTO> getTasksByDateRange(String status, LocalDateTime startDate, 
                                             LocalDateTime endDate, Pageable pageable) {
        Task.TaskStatus taskStatus = Task.TaskStatus.valueOf(status.toUpperCase());
        return taskRepository.findTasksByStatusAndDateRange(taskStatus, startDate, endDate, pageable)
                .map(this::mapToDTO);
    }

    private TaskDTO mapToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setTaskId(task.getTaskId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDeadline(task.getDeadline());
        dto.setStatus(task.getStatus().name());
        dto.setEmployeeId(task.getEmployee().getId());
        dto.setEmployeeName(task.getEmployee().getName());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        dto.setPriority(task.getPriority());
        dto.setIsOverdue(task.isOverdue());
        return dto;
    }
}
