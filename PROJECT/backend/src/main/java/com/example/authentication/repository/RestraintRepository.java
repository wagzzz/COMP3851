package com.example.authentication.repository;

import com.example.authentication.entity.Restraint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestraintRepository extends JpaRepository<Restraint, Long> {

    List<Restraint> findAllByDegree_DegreeId(Long degreeId);
}
