package com.example.authentication.service;

import com.example.authentication.entity.*;
import com.example.authentication.repository.CoursePlanRepository;
import com.example.authentication.repository.CourseRepository;
import com.example.authentication.repository.DegreePlanRepository;
import com.example.authentication.repository.RestraintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("UserService")
public class UserService {

    @Autowired
    DegreePlanRepository degreePlanRepository;
    @Autowired
    CoursePlanRepository coursePlanRepository;
    @Autowired
    RestraintRepository restraintRepository;
    @Autowired
    CourseRepository courseRepository;

    /**
     * Make copy of degreePlan for user
     * @param degreePlan
     * @return
     */
    public List<CoursePlan> cloneDegreePlan(DegreePlan degreePlan) {

        DegreePlan adminDegreePlan = degreePlanRepository.findFirstByDegree_DegreeIdAndAssignedToUser(
                degreePlan.degree.degreeId, false
        );
        List<CoursePlan> coursePlans = coursePlanRepository.findCoursePlansByDegreePlan_IdOrderBySequence(adminDegreePlan.id);

        // if the user starts from semester 2, the coursePlans of admin will be moved right 4 step.
        for(CoursePlan coursePlan: coursePlans) {
            CoursePlan userCoursePlan = new CoursePlan(coursePlan, degreePlan);
            if(degreePlan.startSemester == 2) {
                userCoursePlan.sequence += 4;
            }
            coursePlanRepository.save(userCoursePlan);
        }
        if(degreePlan.startSemester == 2) {
            // first of 4 coursePlans will be disabled.
            for(int i = 1; i <= 4; i ++) {
                coursePlanRepository.save(new CoursePlan(degreePlan, null, "", i, true));
            }
        }
        return coursePlanRepository.findCoursePlansByDegreePlan_IdOrderBySequence(degreePlan.id);
    }

    /**
     * Delete old coursePlans and Save new coursePlans of degreePlan
     * @param coursePlans
     * @return
     */
    public List<CoursePlan> saveCoursePlans(List<CoursePlan> coursePlans) {

        if(coursePlans.size() == 0) return null;
        Long degreePlanId = coursePlans.get(0).degreePlan.id;

        List<CoursePlan> exCoursePlans = coursePlanRepository.findCoursePlansByDegreePlan_IdOrderBySequence(degreePlanId);
        for(CoursePlan coursePlan : exCoursePlans) {
            coursePlanRepository.delete(coursePlan);
        }

        for(CoursePlan coursePlan : coursePlans) {
            coursePlanRepository.save(coursePlan);
        }
        return coursePlans;
    }

    /**
     * restrains of degree and new restrains from total courses
     * @param degree
     * @return
     */
    public List<Restraint> buildTotalRestraints(Degree degree) {

        List<Course> courses = courseRepository.findAll();
        List<Restraint> restraints = restraintRepository.findAllByDegree_DegreeId(degree.degreeId);

        Map<Long, String> restraintsMap = new HashMap<>();
        for(Restraint restraint : restraints) {
            restraintsMap.put(restraint.course.courseId, restraint.type);
        }

        List<Restraint> totalRestrains = new ArrayList<>();
        for(Course course: courses) {
            String type = restraintsMap.get(course.courseId);
            if( type == null ) type = "Elective";
            totalRestrains.add( new Restraint( type,  degree, course) );
        }

        return totalRestrains;
    }

    /**
     * check if there is deleted course and return updated coursePlans
     * @param degreePlan
     * @return
     */
    public List<CoursePlan> checkAndGetCoursePlans(DegreePlan degreePlan) {
        List<CoursePlan> coursePlans = coursePlanRepository.findCoursePlansByDegreePlan_IdOrderBySequence(degreePlan.id);

        int len = degreePlan.degree.numberOfUnits / 10 + (degreePlan.startSemester - 1) * 4;
        int []flag = new int[len + 1];
        for(int i = 1; i <= len; i ++) flag[i] = 0;
        for(CoursePlan coursePlan: coursePlans) {
            if (coursePlan.sequence > len) {
                coursePlanRepository.delete(coursePlan);
                continue;
            }
            flag[coursePlan.sequence] = 1;
        }
        for(int i = 1; i <= len; i ++ ) {
            if(flag[i] == 1) continue;
            coursePlanRepository.save(new CoursePlan(degreePlan, "", i));
        }

        return coursePlanRepository.findCoursePlansByDegreePlan_IdOrderBySequence(degreePlan.id);
    }

}
