package com.example.authentication.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor @Data
public class Degree {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long degreeId;

    public String name;
    public String major;
    public String faculty;
    public int numberOfUnits;
    public boolean assignedToUser;
    public String savedName;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public User user;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "degree_id",
            referencedColumnName = "degreeId"
    )
    public Set<Course> courses;

    public Degree(String name, String major, String faculty, int numberOfUnits, boolean assignedToUser){
        this.name = name;
        this.major = major;
        this.faculty = faculty;
        this.numberOfUnits = numberOfUnits;
        this.assignedToUser = assignedToUser;
        courses = new HashSet<>();
    }

    //Copy constructor for making a copy of Degree for adding to user
    public Degree(Degree degree){
        this.degreeId = null;
        this.name = degree.name;
        this.major = degree.major;
        this.faculty = degree.faculty;
        this.numberOfUnits = degree.numberOfUnits;
        this.assignedToUser = true;
        courses = new HashSet<>();

        //Uses course copy instructor to also copy the courses that are inside the degree
        for(Course element : degree.courses)
        {
            Course tempCourse = new Course(element);
            courses.add(new Course(tempCourse));
        }

    }

    public void addCourse(Course course)
    {
        courses.add(course);
    }


}
