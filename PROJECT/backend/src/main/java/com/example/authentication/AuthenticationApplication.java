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

    @Override
    public void run(String... args) throws Exception {

        //Admin Account
        this.adminRepository.save(new Admin("Admin", "Account","admin@uon.edu.au" ,"admin"));

        //User Account
        this.userRepository.save(new User("John", "Smith", "123456789@uon.edu.au", "123456789"));

        //Course
        this.courseRepository.save(new Course("COMP1010", "COMPUTING FUNDAMENTALS", 1, 10, 1, false));
        this.courseRepository.save(new Course("MNGT1001", "FOUNDATIONS OF MARKETING", 1, 10, 1, false));
        this.courseRepository.save(new Course("MATH1110", "MATHEMATICS FOR ENGINEERING, SCIENCE AND TECHNOLOGY 1", 1, 10, 1, false));
        this.courseRepository.save(new Course("SENG1110", "OBJECT ORIENTED PROGRAMMING", 1, 10, 1, false));
        this.courseRepository.save(new Course("COMP1140", "DATABASE AND INFORMATION MANAGEMENT", 1, 10, 2, false));
        this.courseRepository.save(new Course("MATH1510", "DISCRETE MATHEMATICS", 1, 10, 2, false));
        this.courseRepository.save(new Course("SENG1050", "WEB TECHNOLOGIES", 1, 10, 2, false));
        this.courseRepository.save(new Course("SENG1120", "DATA STRUCTURES", 1, 10, 2, false));
        this.courseRepository.save(new Course("COMP2270", "THEORY OF COMPUTATION", 2, 10, 1, false));
        this.courseRepository.save(new Course("SENG2050", "WEB ENGINEERING", 3, 10, 1, false));
        this.courseRepository.save(new Course("SENG2130", "SYSTEMS ANALYSIS AND DESIGN", 2, 10, 1, false));
        this.courseRepository.save(new Course("SENG2200", "PROGRAMMING LANGUAGES AND PARADIGMS", 2, 10, 1, false));
        this.courseRepository.save(new Course("COMP2230", "ALGORITHMS", 2, 10, 2, false));
        this.courseRepository.save(new Course("COMP2240", "OPERATING SYSTEMS", 2, 10, 2, false));
        this.courseRepository.save(new Course("SENG2250", "SYSTEM AND NETWORK SECURITY", 2, 10, 2, false));
        this.courseRepository.save(new Course("SENG2260", "HUMAN-COMPUTER INTERACTION", 2, 10, 2, false));
        this.courseRepository.save(new Course("COMP3851A", "CS & IT WIL A", 3, 10, 1, false));
        this.courseRepository.save(new Course("INFT3100", "PROJECT MANAGEMENT", 3, 10, 1, false));
        this.courseRepository.save(new Course("INFT3800", "PROFESSIONAL PRACTICE IN INFORMATION TECHNOLOGY", 3, 10, 1, false));
        this.courseRepository.save(new Course("SENG3320", "SOFTWARE VERIFICATION AND VALIDATION", 3, 10, 1, false));
        this.courseRepository.save(new Course("COMP3851B", "CS & IT WIL B", 3, 10, 2, false));
        this.courseRepository.save(new Course("COMP3260", "DATA SECURITY", 3, 10, 2, false));
        this.courseRepository.save(new Course("COMP3320", "COMPUTER GRAPHICS", 3, 10, 2, false));
        this.courseRepository.save(new Course("ELEC3500", "TELECOMMUNICATIONS NETWORK", 3, 10, 2, false));
        this.courseRepository.save(new Course("ELEC3500", "TELECOMMUNICATIONS NETWORK", 3, 10, 2, false));

        //Computer Science with Software Development Major
        Degree tempDegree = new Degree("Bachelor of Computer Science", "Software Development", "Engineering", 240, false);

        tempDegree.addCourse(new Course("COMP1010", "COMPUTING FUNDAMENTALS", "CORE", 1, 10, 1, true));
        tempDegree.addCourse(new Course("MNGT1001", "FOUNDATIONS OF MARKETING", "ELECTIVE", 1, 10, 1, true));
        tempDegree.addCourse(new Course("MATH1110", "MATHEMATICS FOR ENGINEERING, SCIENCE AND TECHNOLOGY 1", "CORE", 1, 10, 1, true));
        tempDegree.addCourse(new Course("SENG1110", "OBJECT ORIENTED PROGRAMMING", "CORE", 1, 10, 1, true));
        tempDegree.addCourse(new Course("COMP1140", "DATABASE AND INFORMATION MANAGEMENT", "CORE", 1, 10, 2, true));
        tempDegree.addCourse(new Course("MATH1510", "DISCRETE MATHEMATICS", "CORE", 1, 10, 2, true));
        tempDegree.addCourse(new Course("SENG1050", "WEB TECHNOLOGIES", "CORE", 1, 10, 2, true));
        tempDegree.addCourse(new Course("SENG1120", "DATA STRUCTURES", "CORE", 1, 10, 2, true));
        tempDegree.addCourse(new Course("COMP2270", "THEORY OF COMPUTATION", "CORE", 2, 10, 1, true));
        tempDegree.addCourse(new Course("SENG2050", "WEB ENGINEERING", "DIRECTED", 3, 10, 1, true));
        tempDegree.addCourse(new Course("SENG2130", "SYSTEMS ANALYSIS AND DESIGN", "CORE", 2, 10, 1, true));
        tempDegree.addCourse(new Course("SENG2200", "PROGRAMMING LANGUAGES AND PARADIGMS", "CORE", 2, 10, 1, true));
        tempDegree.addCourse(new Course("COMP2230", "ALGORITHMS", "CORE", 2, 10, 2, true));
        tempDegree.addCourse(new Course("COMP2240", "OPERATING SYSTEMS", "CORE", 2, 10, 2, true));
        tempDegree.addCourse(new Course("SENG2250", "SYSTEM AND NETWORK SECURITY", "CORE", 2, 10, 2, true));
        tempDegree.addCourse(new Course("SENG2260", "HUMAN-COMPUTER INTERACTION", "CORE", 2, 10, 2, true));
        tempDegree.addCourse(new Course("COMP3851A", "CS & IT WIL A", "CORE", 3, 10, 1, true));
        tempDegree.addCourse(new Course("INFT3100", "PROJECT MANAGEMENT", "CORE", 3, 10, 1, true));
        tempDegree.addCourse(new Course("INFT3800", "PROFESSIONAL PRACTICE IN INFORMATION TECHNOLOGY", "CORE", 3, 10, 1, true));
        tempDegree.addCourse(new Course("SENG3320", "SOFTWARE VERIFICATION AND VALIDATION", "CORE", 3, 10, 1, true));
        tempDegree.addCourse(new Course("COMP3851B", "CS & IT WIL B", "CORE", 3, 10, 2, true));
        tempDegree.addCourse(new Course("COMP3260", "DATA SECURITY", "DIRECTED", 3, 10, 2, true));
        tempDegree.addCourse(new Course("COMP3320", "COMPUTER GRAPHICS", "DIRECTED", 3, 10, 2, true));
        tempDegree.addCourse(new Course("ELEC3500", "TELECOMMUNICATIONS NETWORK", "CORE", 3, 10, 2, true));
        tempDegree.addCourse(new Course("ELEC3500", "TELECOMMUNICATIONS NETWORK", "CORE", 3, 10, 2, true));
        this.degreeRepository.save(tempDegree);

        Degree userDegree = degreeRepository.findDegreeByName("Bachelor of Computer Science");
        Degree userDegreeCopy = new Degree(userDegree);
        userDegreeCopy.setSavedName("My First Degree");
        degreeRepository.save(userDegreeCopy);

        User tempUser = userRepository.findUserByEmail("123456789@uon.edu.au");
        tempUser.userDegrees.add(userDegreeCopy);
        userRepository.save(tempUser);

    }
}