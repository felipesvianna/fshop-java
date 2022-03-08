package com.example.fshop.repository;

import com.example.fshop.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Optional<User> findByUsername(String username);
    Optional<User> findUserByEmail(String email);
    Optional<User> findById(String id);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
