package com.example.authentication.controller;

import com.example.authentication.entity.CoursePlan;
import com.example.authentication.entity.Degree;
import com.example.authentication.entity.DegreePlan;
import com.example.authentication.entity.User;
import com.example.authentication.model.DegreePlanDetail;
import com.example.authentication.repository.DegreePlanRepository;
import com.example.authentication.repository.DegreeRepository;
import com.example.authentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController("UserController")
@RequestMapping("/user")
public class UserController {

    @Autowired
    DegreePlanRepository degreePlanRepository;
    @Autowired
    DegreeRepository degreeRepository;
    @Autowired
    UserService userService;
    /**
     * Get all degrees
     * @return
     */
    @GetMapping("/degrees")
    public ResponseEntity<Object> getDegrees() {
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
     * Get user's degreePlan list
     * @param userId
     * @return
     */
    @GetMapping("/degreePlans/{userId}")
    public ResponseEntity<Object> getDegreePlans(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok().body(
                    degreePlanRepository.findDegreePlansByUser_UserId(userId)
            );
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user's degreePlan
     * @param degreePlanId
     * @return
     */
    @GetMapping("/degreePlan/{degreePlanId}")
    public ResponseEntity<Object> getDegreePlan(@PathVariable Long degreePlanId) {

        try {

            // if exists degreePlan created by user
            boolean exists = degreePlanRepository.existsDegreePlanById(degreePlanId);

            if( !exists ) {
                // if degreePlan doesn't exist return null;
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }

            DegreePlan degreePlan = degreePlanRepository.findDegreePlanById(degreePlanId);

            return ResponseEntity.ok().body(
                    new DegreePlanDetail(
                            userService.checkAndGetCoursePlans(degreePlan),
                            userService.buildTotalRestraints(degreePlan.degree)
                    )
            );

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create new degreePlan of user
     * @param degreePlan
     * @return
     */
    @PostMapping("/degreePlan")
    public ResponseEntity createDegreePlan(@RequestBody DegreePlan degreePlan) {

        try {
            degreePlan.assignedToUser = true;

            boolean existsAdminDegreePlan = degreePlanRepository.existsDegreePlanByDegree_DegreeIdAndAssignedToUser(
                    degreePlan.degree.degreeId, false
            );

            if( !existsAdminDegreePlan ) return new ResponseEntity<>("Admin template doesn't exists", HttpStatus.BAD_REQUEST);

            degreePlan = degreePlanRepository.save(degreePlan);

            // make copy of degreePlan made by admin
            // important : startSemester
            userService.cloneDegreePlan(degreePlan);

            return new ResponseEntity<>(degreePlan, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Edit existing degreePlan of user
     * @param coursePlans
     * @return
     */
    @PutMapping("/degreePlan")
    public ResponseEntity editDegreePlan(@RequestBody List<CoursePlan> coursePlans) {

        try {
            coursePlans = userService.saveCoursePlans(coursePlans);
            return new ResponseEntity<>(coursePlans, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete existing degreePlan with degreeId
     * @param degreePlanId
     * @return
     */
    @DeleteMapping("/degreePlan/{degreePlanId}")
    public ResponseEntity deleteDegreePlan(@PathVariable Long degreePlanId){

        try {

            boolean exists = degreePlanRepository.existsDegreePlanById(degreePlanId);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            degreePlanRepository.deleteById(degreePlanId);
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
