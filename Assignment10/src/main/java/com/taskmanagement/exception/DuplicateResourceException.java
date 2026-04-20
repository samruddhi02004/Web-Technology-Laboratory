package com.taskmanagement.exception;

public class DuplicateResourceException extends RuntimeException {
    
    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String message, Throwable cause) {
        super(message, cause);
    }

    public static DuplicateResourceException emailAlreadyExists(String email) {
        return new DuplicateResourceException("Email already exists: " + email);
    }
}
