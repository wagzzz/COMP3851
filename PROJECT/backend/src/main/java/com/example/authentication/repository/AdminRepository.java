package com.example.authentication.repository;

import com.example.authentication.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Boolean existsAdminByEmail(String email);
    Boolean existsAdminByEmailAndPassword(String email, String password);
    Admin findAdminByEmail(String email);
}