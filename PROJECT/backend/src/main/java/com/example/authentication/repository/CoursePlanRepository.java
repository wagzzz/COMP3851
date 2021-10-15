package com.example.authentication.repository;

import com.example.authentication.entity.CoursePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursePlanRepository extends JpaRepository<CoursePlan, Long> {
    CoursePlan findCoursePlanById(Long id);
    CoursePlan findCoursePlanByCourse_CourseId(Long courseId);
    List<CoursePlan> findCoursePlansByDegreePlan_IdOrderBySequence(Long degreeId);
    void deleteCoursePlansByDegreePlan_Id(Long degreePlanId);
}
