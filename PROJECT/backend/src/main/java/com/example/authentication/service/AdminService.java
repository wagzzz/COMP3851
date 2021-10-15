package com.example.authentication.service;

import com.example.authentication.entity.*;
import com.example.authentication.repository.CoursePlanRepository;
import com.example.authentication.repository.CourseRepository;
import com.example.authentication.repository.RestraintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("AdminService")
public class AdminService {

    @Autowired
    CoursePlanRepository coursePlanRepository;
    @Autowired
    RestraintRepository restraintRepository;
    @Autowired
    CourseRepository courseRepository;

    /**
     * Create coursePlans when admin starts degree plan
     * @param degreePlan
     * @return
     */
    public List<CoursePlan>  initDegreePlan(DegreePlan degreePlan) {

        List<CoursePlan> coursePlans = new ArrayList<>();

        int coursePlan_count = degreePlan.degree.numberOfUnits / 10;

        for(int i = 1; i <= coursePlan_count; i ++) {
            CoursePlan coursePlan = new CoursePlan(degreePlan, "", i);
            coursePlan = coursePlanRepository.save(coursePlan);
            coursePlans.add(coursePlan);
        }

        return coursePlans;
    }

    /**
     * Save core and directed courses related to degree
     * @param degreeId
     * @param restraints
     */
    public void saveRestraintsByDegree(Long degreeId, List<Restraint> restraints) {

        List<Restraint> exRestraints = restraintRepository.findAllByDegree_DegreeId(degreeId);
        for(Restraint restraint: exRestraints) {
            restraintRepository.delete(restraint);
        }
        for(Restraint restraint: restraints) {
            restraintRepository.save(new Restraint(
                restraint.type, new Degree(degreeId), restraint.course
            ));
        }
    }


}
