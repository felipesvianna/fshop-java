package com.example.fshop.repository;
import com.example.fshop.models.ERoles;
import com.fshop.spring.jwt.mongodb.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERoles name);
}
