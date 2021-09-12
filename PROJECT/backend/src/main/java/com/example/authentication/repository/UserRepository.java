package com.example.authentication.repository;

import com.example.authentication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsUserByEmail(String email);
    Boolean existsUserByEmailAndPassword(String email, String password);
    User findUserByEmail(String email);
}
