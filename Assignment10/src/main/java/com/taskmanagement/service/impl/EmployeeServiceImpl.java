package com.taskmanagement.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.taskmanagement.dto.EmployeeDTO;
import com.taskmanagement.dto.EmployeeDetailsDTO;
import com.taskmanagement.dto.TaskDTO;
import com.taskmanagement.entity.Employee;
import com.taskmanagement.entity.Task;
import com.taskmanagement.exception.DuplicateResourceException;
import com.taskmanagement.exception.ResourceNotFoundException;
import com.taskmanagement.repository.EmployeeRepository;
import com.taskmanagement.service.EmployeeService;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        if (employeeRepository.findByEmail(employeeDTO.getEmail()).isPresent()) {
            throw DuplicateResourceException.emailAlreadyExists(employeeDTO.getEmail());
        }

        Employee employee = new Employee(employeeDTO.getName(), employeeDTO.getEmail(), employeeDTO.getDepartment());
        Employee savedEmployee = employeeRepository.save(employee);
        return mapToDTO(savedEmployee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(id));
        return mapToDTO(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeDetailsDTO getEmployeeDetailsById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(id));
        
        List<TaskDTO> taskDTOs = employee.getTasks().stream()
                .map(this::taskToDTO)
                .collect(Collectors.toList());

        long completedCount = employee.getTasks().stream()
                .filter(t -> t.getStatus() == Task.TaskStatus.COMPLETED)
                .count();

        long pendingCount = employee.getTasks().stream()
                .filter(t -> t.getStatus() == Task.TaskStatus.PENDING)
                .count();

        EmployeeDetailsDTO details = new EmployeeDetailsDTO();
        details.setId(employee.getId());
        details.setName(employee.getName());
        details.setEmail(employee.getEmail());
        details.setDepartment(employee.getDepartment());
        details.setRole(employee.getRole().name());
        details.setCreatedAt(employee.getCreatedAt());
        details.setUpdatedAt(employee.getUpdatedAt());
        details.setTasks(taskDTOs);
        details.setTaskCount(employee.getTasks().size());
        details.setCompletedTaskCount((int) completedCount);
        details.setPendingTaskCount((int) pendingCount);
        
        return details;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable)
                .map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> searchEmployees(String searchTerm, Pageable pageable) {
        return employeeRepository.searchEmployees(searchTerm, pageable)
                .map(this::mapToDTO);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(id));

        if (!employee.getEmail().equals(employeeDTO.getEmail()) && 
            employeeRepository.findByEmail(employeeDTO.getEmail()).isPresent()) {
            throw DuplicateResourceException.emailAlreadyExists(employeeDTO.getEmail());
        }

        employee.setName(employeeDTO.getName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setDepartment(employeeDTO.getDepartment());

        Employee updatedEmployee = employeeRepository.save(employee);
        return mapToDTO(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.employeeNotFound(id));
        employeeRepository.delete(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> getEmployeesByDepartment(String department, Pageable pageable) {
        return employeeRepository.findByDepartment(department, pageable)
                .map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> getEmployeesByRole(String role) {
        Employee.EmployeeRole employeeRole = Employee.EmployeeRole.valueOf(role.toUpperCase());
        return employeeRepository.findByRole(employeeRole).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private EmployeeDTO mapToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setDepartment(employee.getDepartment());
        dto.setRole(employee.getRole().name());
        dto.setCreatedAt(employee.getCreatedAt());
        dto.setUpdatedAt(employee.getUpdatedAt());
        dto.setTaskCount(employee.getTasks().size());
        return dto;
    }

    private TaskDTO taskToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setTaskId(task.getTaskId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setDeadline(task.getDeadline());
        dto.setStatus(task.getStatus().name());
        dto.setEmployeeName(task.getEmployee().getName());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        dto.setPriority(task.getPriority());
        dto.setIsOverdue(task.isOverdue());
        return dto;
    }
}
