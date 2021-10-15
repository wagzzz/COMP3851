package com.example.authentication.repository;

import com.example.authentication.entity.DegreePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DegreePlanRepository extends JpaRepository<DegreePlan, Long> {
    DegreePlan findDegreePlanById(Long id);
    boolean existsDegreePlanById(Long id);
    DegreePlan findFirstByDegree_DegreeIdAndAssignedToUser(Long degreeId, boolean assignedToUser);
    boolean existsDegreePlanByDegree_DegreeIdAndAssignedToUser(Long degreeId, boolean assignedToUser);
    DegreePlan findFirstByDegree_DegreeIdAndUser_UserId(Long degreeId, Long userId);
    boolean existsDegreePlanByDegree_DegreeIdAndUser_UserId(Long degreeId, Long userId);
    List<DegreePlan> findDegreePlansByUser_UserId(Long userId);
}
