package com.taskmanagement.exception;

public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public static ResourceNotFoundException employeeNotFound(Long id) {
        return new ResourceNotFoundException("Employee not found with id: " + id);
    }

    public static ResourceNotFoundException taskNotFound(Long id) {
        return new ResourceNotFoundException("Task not found with id: " + id);
    }
}
