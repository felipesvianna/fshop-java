package com.example.fshop.service;

import com.example.fshop.models.ProductOrder;
import com.example.fshop.repository.ProductOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductOrderService {
    @Autowired
    ProductOrderRepository productOrderRepository;

    @Transactional
    public ProductOrder saveProductOrder(ProductOrder productOrder) {return productOrderRepository.save(productOrder);}
}
