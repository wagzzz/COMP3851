package com.example.authentication.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor @Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long courseId;

    public String code;
    public String name;
    public int level;
    public int units;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            //name = "degree_plans_degree_id",
            referencedColumnName = "courseId"
    )
    public List<CoursePlan> coursePlans;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            //name = "restraints_degree_id",
            referencedColumnName = "courseId"
    )
    public List<Restraint> restraints;

    public Course(String code, String name, int level, int units) {
        this.name = name;
        this.code = code;
        this.level = level;
        this.units = units;
    }
}
