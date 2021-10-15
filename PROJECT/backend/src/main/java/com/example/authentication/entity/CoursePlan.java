package com.example.authentication.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
public class CoursePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    public String type; //"Core", "Elective", "Directed", ""->undefined
    public int sequence; // order of coursePlan in degreePlan
    public boolean disabled; // sometimes used for sequence of 1~4 when the user start from semester 2

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Course course;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public DegreePlan degreePlan;

    public CoursePlan(DegreePlan degreePlan, String type, int sequence) {
        this.degreePlan = degreePlan;
        course = null;
        this.type = type;
        this.sequence = sequence;
        this.disabled = false;
    }

    public CoursePlan(DegreePlan degreePlan, Course course, String type, int sequence) {
        this.degreePlan = degreePlan;
        this.type = type;
        this.sequence = sequence;
        this.course = course;
        this.disabled = false;
    }

    public CoursePlan(DegreePlan degreePlan, Course course, String type, int sequence, boolean disabled) {
        this.degreePlan = degreePlan;
        this.type = type;
        this.sequence = sequence;
        this.course = course;
        this.disabled = disabled;
    }

    public CoursePlan (CoursePlan tempCoursePlan, DegreePlan degreePlan) {
        this.degreePlan = degreePlan;
        this.type = tempCoursePlan.type;
        this.sequence = tempCoursePlan.sequence;
        this.course = tempCoursePlan.course;
        this.disabled = tempCoursePlan.disabled;
    }
}
