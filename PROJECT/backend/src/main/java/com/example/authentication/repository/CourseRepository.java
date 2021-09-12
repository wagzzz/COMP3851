package com.example.authentication.repository;

import com.example.authentication.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    //Call function with value 'false' to return base 'initial' courses
    List<Course> findCoursesByAssignedToDegree(Boolean assignedToDegree);
}
