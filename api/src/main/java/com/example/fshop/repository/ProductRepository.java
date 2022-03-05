package com.example.fshop.repository;

import com.example.fshop.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<Product> findById(String id);
    Boolean existsByName(String name);
}
