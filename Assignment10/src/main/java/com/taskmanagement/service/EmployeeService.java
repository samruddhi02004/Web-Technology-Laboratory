package com.taskmanagement.service;

import com.taskmanagement.dto.EmployeeDTO;
import com.taskmanagement.dto.EmployeeDetailsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDetailsDTO getEmployeeDetailsById(Long id);
    Page<EmployeeDTO> getAllEmployees(Pageable pageable);
    Page<EmployeeDTO> searchEmployees(String searchTerm, Pageable pageable);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    void deleteEmployee(Long id);
    Page<EmployeeDTO> getEmployeesByDepartment(String department, Pageable pageable);
    List<EmployeeDTO> getEmployeesByRole(String role);
}
