package com.example.fshop.service;

import com.example.fshop.models.Order;
import com.example.fshop.models.Product;
import com.example.fshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public List<Order> getAllOrdersFromUser(String userId) {
        return orderRepository.findOrdersByCustomerId(userId);
    }

    @Transactional
    public Order saveOrder(Order order) { return orderRepository.save(order); }

    public Boolean orderAlreadyExists(int number) {return orderRepository.existsByNumber(number);}
}
