package com.example.authentication.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@AllArgsConstructor @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String studentId;
    public String firstName;
    public String lastName;
    public String password;
    public String email;
}
