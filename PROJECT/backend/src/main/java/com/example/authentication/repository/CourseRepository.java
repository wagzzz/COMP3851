package com.example.authentication.repository;

import com.example.authentication.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Course findCourseByCourseId(long courseId);
    Course findCourseByCode(String code);
    boolean existsCourseByCourseId(long courseId);
    boolean existsCourseByCode(String code);
}
