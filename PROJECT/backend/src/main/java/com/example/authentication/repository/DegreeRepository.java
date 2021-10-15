package com.example.authentication.repository;

import com.example.authentication.entity.Degree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DegreeRepository extends JpaRepository<Degree, Long> {
    Degree findDegreeByDegreeId(Long id);
    Degree findDegreeByNameAndMajor(String name, String major);
    List<Degree> findAll();
    Boolean existsDegreeByDegreeId(Long id);
    Boolean existsDegreeByNameAndMajor(String name, String major);
}
