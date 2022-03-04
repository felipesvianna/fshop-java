package com.example.fshop.service;

import com.example.fshop.models.User;
import com.example.fshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User registerNewUser(User userInstance) {
        userRepository.save(userInstance);
        return userInstance;
    }

    public Boolean emailAlreadyExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
