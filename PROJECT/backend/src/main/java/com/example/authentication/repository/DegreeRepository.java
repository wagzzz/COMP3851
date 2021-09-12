package com.example.authentication.repository;

import com.example.authentication.entity.Degree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DegreeRepository extends JpaRepository<Degree, Long> {
    Degree findDegreeByName(String name);
}
