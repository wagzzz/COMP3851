package com.example.authentication.controller;

import com.example.authentication.entity.Admin;
import com.example.authentication.entity.User;
import com.example.authentication.repository.AdminRepository;
import com.example.authentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class authController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register/admin")
    public ResponseEntity registerAdmin(@RequestBody Admin admin){
        try{
            boolean exists = adminRepository.existsAdminByEmail(admin.email);
            if(exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            adminRepository.save(admin);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register/user")
    public ResponseEntity registerUser(@RequestBody User user){
        try{
            boolean exists = userRepository.existsUserByEmail(user.email);
            if(exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            userRepository.save(user);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/user")
    public ResponseEntity<Object> loginUser(@RequestBody User user){
        try{
            boolean exists = userRepository.existsUserByEmailAndPassword(user.email, user.password);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            return ResponseEntity.ok().body(userRepository.findUserByEmail(user.email));
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/admin")
    public ResponseEntity<Object> loginAdmin(@RequestBody Admin admin){
        try{
            boolean exists = adminRepository.existsAdminByEmailAndPassword(admin.email, admin.password);
            if(!exists)
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            return ResponseEntity.ok().body(adminRepository.findAdminByEmail(admin.email));
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
