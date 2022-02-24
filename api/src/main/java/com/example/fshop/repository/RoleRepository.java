package com.example.fshop.repository;
import com.example.fshop.models.ERoles;
import com.example.fshop.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERoles name);
}
