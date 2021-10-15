package com.example.authentication.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class DegreePlan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    public String savedName;
    public boolean assignedToUser;
    public int startSemester;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public User user;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    public Degree degree;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            referencedColumnName = "id"
    )
    public List<CoursePlan> coursePlans;

    public DegreePlan(Degree degree, String savedName, boolean assignedToUser, int startSemester) {
        this.degree = degree;
        this.savedName = savedName;
        this.assignedToUser = assignedToUser;
        this.startSemester = startSemester;
    }

    public DegreePlan(Degree degree, User user, String savedName, boolean assignedToUser, int startSemester) {
        this.savedName = savedName;
        this.assignedToUser = assignedToUser;
        this.startSemester = startSemester;
        this.user = user;
        this.degree = degree;
    }
}
