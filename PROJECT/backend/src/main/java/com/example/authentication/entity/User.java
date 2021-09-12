package com.example.authentication.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@AllArgsConstructor @NoArgsConstructor @Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long userId;

    public String firstName;
    public String lastName;
    public String email;
    public String password;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "userId"
    )
    public Set<Degree> userDegrees;

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        userDegrees = new HashSet<Degree>() {
        };

    }

}
