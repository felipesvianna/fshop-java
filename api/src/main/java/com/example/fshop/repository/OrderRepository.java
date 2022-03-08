package com.example.fshop.repository;

import com.example.fshop.models.Order;
import org.springframework.data.mongodb.core.aggregation.BooleanOperators;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<Order> findById(String id);
    Boolean existsByNumber(int number);

    @Query("{ 'customer.id' : ?0 }")
    List<Order> findOrdersByCustomerId(String customerId);
}
