package com.example.fshop.service;

import com.example.fshop.models.Order;
import com.example.fshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public Optional<Order> findOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getAllOrdersFromUser(String userId) {
        return orderRepository.findOrdersByCustomerId(userId);
    }

    @Transactional
    public Order saveOrder(Order order) { return orderRepository.save(order); }

    public Boolean orderAlreadyExists(int number) {return orderRepository.existsByNumber(number);}
}
