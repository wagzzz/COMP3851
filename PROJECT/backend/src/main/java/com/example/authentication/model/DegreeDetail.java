package com.example.authentication.model;

import com.example.authentication.entity.Course;
import com.example.authentication.entity.Degree;
import com.example.authentication.entity.Restraint;

import java.util.List;

public class DegreeDetail {

    public List<Course> courses;
    public List<Restraint> restraints;

    public DegreeDetail(List<Course> courses, List<Restraint> restraints) {
        this.courses = courses;
        this.restraints = restraints;
    }
}
