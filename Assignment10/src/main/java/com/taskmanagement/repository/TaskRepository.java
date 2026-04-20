package com.taskmanagement.repository;

import com.taskmanagement.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByEmployeeId(Long employeeId, Pageable pageable);

    Page<Task> findByStatus(Task.TaskStatus status, Pageable pageable);

    Page<Task> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.employee.id = :employeeId AND t.status = :status")
    List<Task> findTasksByEmployeeAndStatus(@Param("employeeId") Long employeeId, 
                                            @Param("status") Task.TaskStatus status);

    @Query("SELECT t FROM Task t WHERE t.deadline < :now AND t.status != :status")
    List<Task> findOverdueTasks(@Param("now") LocalDateTime now, 
                               @Param("status") Task.TaskStatus status);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.employee.id = :employeeId AND t.status = :status")
    Long countByEmployeeAndStatus(@Param("employeeId") Long employeeId, 
                                  @Param("status") Task.TaskStatus status);

    @Query("SELECT t FROM Task t WHERE t.status = :status AND t.deadline BETWEEN :startDate AND :endDate " +
           "ORDER BY t.deadline ASC")
    Page<Task> findTasksByStatusAndDateRange(@Param("status") Task.TaskStatus status,
                                             @Param("startDate") LocalDateTime startDate,
                                             @Param("endDate") LocalDateTime endDate,
                                             Pageable pageable);

    @Query("SELECT t FROM Task t ORDER BY t.priority DESC, t.deadline ASC")
    Page<Task> findAllTasksOrderByPriorityAndDeadline(Pageable pageable);

    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(t.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Task> searchTasks(@Param("searchTerm") String searchTerm, Pageable pageable);
}
