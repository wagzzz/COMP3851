package com.example.authentication;

import com.example.authentication.entity.*;
import com.example.authentication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class AuthenticationApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(AuthenticationApplication.class, args);
    }

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private DegreeRepository degreeRepository;

    @Autowired
    private DegreePlanRepository degreePlanRepository;

    @Autowired
    private CoursePlanRepository coursePlanRepository;

    @Autowired
    private RestraintRepository restraintRepository;

    @Override
    public void run(String... args) throws Exception {

        //Admin Account
        this.adminRepository.save(new Admin("Admin", "Account","admin@uon.edu.au" ,"admin"));

        //User Account
        this.userRepository.save(new User("John", "Smith", "123456789@uon.edu.au", "123456789"));

        //Course
        this.courseRepository.save(new Course("COMP1010", "COMPUTING FUNDAMENTALS", 1, 10));
        this.courseRepository.save(new Course("MNGT1001", "FOUNDATIONS OF MARKETING", 1, 10));
        this.courseRepository.save(new Course("MATH1110", "MATHEMATICS FOR ENGINEERING, SCIENCE AND TECHNOLOGY 1", 1, 10));
        this.courseRepository.save(new Course("SENG1110", "OBJECT ORIENTED PROGRAMMING", 1, 10));
        this.courseRepository.save(new Course("COMP1140", "DATABASE AND INFORMATION MANAGEMENT", 1, 10));
        this.courseRepository.save(new Course("MATH1510", "DISCRETE MATHEMATICS", 1, 10));
        this.courseRepository.save(new Course("SENG1050", "WEB TECHNOLOGIES", 1, 10));
        this.courseRepository.save(new Course("SENG1120", "DATA STRUCTURES", 1, 10));
        this.courseRepository.save(new Course("COMP2270", "THEORY OF COMPUTATION", 2, 10));
        this.courseRepository.save(new Course("SENG2050", "WEB ENGINEERING", 3, 10));
        this.courseRepository.save(new Course("SENG2130", "SYSTEMS ANALYSIS AND DESIGN", 2, 10));
        this.courseRepository.save(new Course("SENG2200", "PROGRAMMING LANGUAGES AND PARADIGMS", 2, 10));
        this.courseRepository.save(new Course("COMP2230", "ALGORITHMS", 2, 10));
        this.courseRepository.save(new Course("COMP2240", "OPERATING SYSTEMS", 2, 10));
        this.courseRepository.save(new Course("SENG2250", "SYSTEM AND NETWORK SECURITY", 2, 10));
        this.courseRepository.save(new Course("SENG2260", "HUMAN-COMPUTER INTERACTION", 2, 10));
        this.courseRepository.save(new Course("COMP3851A", "CS & IT WIL A", 3, 10));
        this.courseRepository.save(new Course("INFT3100", "PROJECT MANAGEMENT", 3, 10));
        this.courseRepository.save(new Course("INFT3800", "PROFESSIONAL PRACTICE IN INFORMATION TECHNOLOGY", 3, 10));
        this.courseRepository.save(new Course("SENG3320", "SOFTWARE VERIFICATION AND VALIDATION", 3, 10));
        this.courseRepository.save(new Course("COMP3851B", "CS & IT WIL B", 3, 10));
        this.courseRepository.save(new Course("COMP3260", "DATA SECURITY", 3, 10));
        this.courseRepository.save(new Course("COMP3320", "COMPUTER GRAPHICS", 3, 10));
        this.courseRepository.save(new Course("ELEC3500", "TELECOMMUNICATIONS NETWORK", 3, 10));
        this.courseRepository.save(new Course("INFT2150", "BUSINESS ANALYSIS", 2, 10));
        this.courseRepository.save(new Course("COMP3350", "ADVANCED DATABASE", 3, 10));
        this.courseRepository.save(new Course("INFT3950", "GAMES DESIGN", 3, 10));
        this.courseRepository.save(new Course("INFT3960", "GAMES PRODUCTION", 3, 10));

        //Computer Science with Software Development Major
        Degree tempDegree = new Degree("Bachelor of Computer Science", "Software Development", "Engineering", 240);

        this.degreeRepository.save(tempDegree);

        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP1010")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("MATH1110")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG1110")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP1140")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("MATH1510")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG1050")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG1120")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP2270")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG2130")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG2200")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP2230")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP2240")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG2250")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG2260")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP3851A")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("INFT3100")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("INFT3800")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("SENG3320")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("COMP3851B")));
        restraintRepository.save(new Restraint("Core", tempDegree, courseRepository.findCourseByCode("ELEC3500")));

        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("SENG2050")));
        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("COMP3260")));
        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("COMP3320")));
        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("INFT2150")));
        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("COMP3350")));
        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("INFT3950")));
        restraintRepository.save(new Restraint("Directed", tempDegree, courseRepository.findCourseByCode("INFT3960")));

    }
}