package com.example.authentication.controller;

import com.example.authentication.entity.*;
import com.example.authentication.model.DegreeDetail;
import com.example.authentication.model.DegreePlanDetail;
import com.example.authentication.repository.*;
import com.example.authentication.service.AdminService;
import com.example.authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("AdminController")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    DegreeRepository degreeRepository;
    @Autowired
    DegreePlanRepository degreePlanRepository;
    @Autowired
    CoursePlanRepository coursePlanRepository;
    @Autowired
    RestraintRepository restraintRepository;

    @Autowired
    AdminService adminService;
    @Autowired
    UserService userService;

    /**
     * Get all courses
     * @return List of previous initial courses
     */
    @GetMapping("/courses")
    public ResponseEntity<Object> getCourses(){
        try {
            return ResponseEntity.ok().body(
                    courseRepository.findAll()
            );
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get courses by id
     * @return course with id
     */
    @GetMapping("/course")
    public ResponseEntity<Object> getCourse(Long id){
        try {
            return ResponseEntity.ok().body(
                    courseRepository.findCourseByCourseId(id)
            );
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create new course
     * @param course
     * @return
     */
    @PostMapping("/course")
    public ResponseEntity createCourse(@RequestBody Course course){

        try {
            // if the course with the same code or name exists
            boolean exists = courseRepository.existsCourseByCode(course.code);
            if(exists)
                return new ResponseEntity<>("Duplicate Code", HttpStatus.BAD_REQUEST);

            courseRepository.save(course);
            return new ResponseEntity<>(course, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Edit existing course
     * @param course
     * @return
     */
    @PutMapping("/course")
    public ResponseEntity editCourse(@RequestBody Course course){

        try {
            // if the course with the same id exists
            boolean exists = courseRepository.existsCourseByCourseId(course.courseId);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            exists = courseRepository.existsCourseByCode(course.code);
            if(exists) {
                Course exCourse = courseRepository.findCourseByCode(course.code);
                if(exCourse.courseId != course.courseId) return new ResponseEntity<>("Duplicate Code", HttpStatus.BAD_REQUEST);
            }

            courseRepository.save(course);
            return new ResponseEntity<>(course, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete existing course
     * @param id
     * @return
     */
    @DeleteMapping("/course/{id}")
    public ResponseEntity deleteCourse(@PathVariable Long id){

        try {
            boolean exists = courseRepository.existsCourseByCourseId(id);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            courseRepository.deleteById(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all degrees
     * @return
     */
    @GetMapping("/degrees")
    public ResponseEntity<Object> getDegrees(){
        try {
            return ResponseEntity.ok().body(
                    degreeRepository.findAll()
            );
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get degree by id
     * @return All Courses and Restraint of Degree
     */
    @GetMapping("/degree/{id}")
    public ResponseEntity<Object> getDegree(@PathVariable Long id){
        try {
            return ResponseEntity.ok().body(
                    new DegreeDetail(
                            courseRepository.findAll(),
                            restraintRepository.findAllByDegree_DegreeId(id)
                    )
            );
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create new degree
     * @param degree
     * @return
     */
    @PostMapping("/degree")
    public ResponseEntity createDegree(@RequestBody Degree degree){

        try {
            // if the initial degree with the same name and major exists
            boolean exists = degreeRepository.existsDegreeByNameAndMajor(degree.name, degree.major);
            if(exists)
                return new ResponseEntity<>("Duplicated degree", HttpStatus.BAD_REQUEST);

            List<Restraint> restraints = degree.restraints;
            degree.restraints = null;
            degreeRepository.save(degree);

            adminService.saveRestraintsByDegree(degree.degreeId, restraints);

            return new ResponseEntity<>(degree, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Edit existing degree
     * @param degree
     * @return
     */
    @PutMapping("/degree")
    public ResponseEntity editDegree(@RequestBody Degree degree) {

        try {
            // if the degree with the same id exists
            boolean exists = degreeRepository.existsDegreeByDegreeId(degree.degreeId);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            exists = degreeRepository.existsDegreeByNameAndMajor(degree.name, degree.major);
            if(exists) {
                Degree exDegree = degreeRepository.findDegreeByNameAndMajor(degree.name, degree.major);
                if( !exDegree.degreeId.equals(degree.degreeId) ) return new ResponseEntity<>("Duplicated degree", HttpStatus.BAD_REQUEST);


            }

            List<Restraint> restraints = degree.restraints;
            degree.restraints = null;
            degreeRepository.save(degree);

            adminService.saveRestraintsByDegree(degree.degreeId, restraints);

            return new ResponseEntity<>(degree, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete existing degree
     * @param id
     * @return
     */
    @DeleteMapping("/degree/{id}")
    public ResponseEntity deleteDegree(@PathVariable Long id){

        try {
            boolean exists = degreeRepository.existsDegreeByDegreeId(id);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            degreeRepository.deleteById(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get restraints and coursePlans by degree id
     * @param degreeId
     * @return
     */
    @GetMapping("/degreePlan/{degreeId}")
    public ResponseEntity<Object> getDegreePlan(@PathVariable Long degreeId) {
        try {
            Degree degree = degreeRepository.findDegreeByDegreeId(degreeId);
            if(degree == null) {
                return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
            }
            // if exists degreePlan created by admin
            boolean exists = degreePlanRepository.existsDegreePlanByDegree_DegreeIdAndAssignedToUser(degreeId, false);
            if(exists) {
                DegreePlan degreePlan = degreePlanRepository.findFirstByDegree_DegreeIdAndAssignedToUser(degreeId, false);

                return ResponseEntity.ok().body(
                        new DegreePlanDetail(
                                userService.checkAndGetCoursePlans(degreePlan),
                                userService.buildTotalRestraints(degree)
                        )
                );
            }

            DegreePlan degreePlan = new DegreePlan(degree, "Admin Template", false, 1);
            degreePlanRepository.save(degreePlan);
            return ResponseEntity.ok().body(
                    new DegreePlanDetail(
                            adminService.initDegreePlan(degreePlan),
                            userService.buildTotalRestraints(degree)
                    )
            );

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * save DegreePlan
     * @param coursePlans
     * @return
     */
    @PutMapping("/degreeplan")
    public ResponseEntity editDegreePlan(@RequestBody List<CoursePlan> coursePlans) {

        try {

            coursePlans = userService.saveCoursePlans(coursePlans);
            return new ResponseEntity<>(coursePlans, HttpStatus.OK);

        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
