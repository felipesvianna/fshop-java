package com.example.fshop.repository;

import com.example.fshop.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findByIsActiveTrue();
    Optional<Category> findById(String id);
    Optional<Category> findByName(String name);
    Boolean existsByName(String name);
}
