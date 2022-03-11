package com.example.fshop.repository;

import com.example.fshop.models.ProductOrder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductOrderRepository extends MongoRepository<ProductOrder, String> {
    Optional<ProductOrder> findById();
}
