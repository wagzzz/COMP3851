package com.example.authentication.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Restraint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    public String type; // "Core", "Directed"

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Degree degree;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Course course;

    public Restraint(String type, Degree degree, Course course) {
        this.type = type;
        this.degree = degree;
        this.course = course;
    }
}
