package com.example.authentication.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor @Data
public class Degree {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long degreeId;

    public String name;
    public String major;
    public String faculty;
    public int numberOfUnits; // 240 or 320

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            //name = "degree_plans_degree_id",
            referencedColumnName = "degreeId"
    )
    public List<DegreePlan> degreePlans;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "restraints_degree_id",
            referencedColumnName = "degreeId"
    )
    public List<Restraint> restraints;

    public Degree(String name, String major, String faculty, int numberOfUnits) {
        this.name = name;
        this.major = major;
        this.faculty = faculty;
        this.numberOfUnits = numberOfUnits;
    }

    public Degree(Long degreeId) {
        this.degreeId = degreeId;
    }
}
