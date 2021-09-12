package com.example.authentication.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor @Data
public class Course {

    @Id
    @GeneratedValue
    public Long id;

    public String courseCode;
    public String courseName;
    public String type;
    public int level;
    public int units;
    public int semester;
    public boolean assignedToDegree;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Degree degree;

    public Course(String courseCode, String courseName, int level, int units, int semester, boolean assignedToDegree){

        this.courseCode = courseCode;
        this.courseName = courseName;
        this.level = level;
        this.units = units;
        this.semester = semester;
        this.assignedToDegree = assignedToDegree;
    }

    public Course(String courseCode, String courseName, String type, int level, int units, int semester, boolean assignedToDegree){

        this.courseCode = courseCode;
        this.courseName = courseName;
        this.type = type;
        this.level = level;
        this.units = units;
        this.semester = semester;
        this.assignedToDegree = assignedToDegree;
    }

    //Copy Constructor for creating 'copies' of the blanks to Users new degrees.
    public Course(Course course){
        this.id = null;
        this.courseCode = course.courseCode;
        this.courseName = course.courseName;
        this.type = course.type;
        this.level = course.level;
        this.units = course.units;
        this.semester = course.semester;
        this.assignedToDegree = course.assignedToDegree;
    }

}
