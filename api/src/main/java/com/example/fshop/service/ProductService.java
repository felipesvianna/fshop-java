package com.example.fshop.service;

import com.example.fshop.models.Product;
import com.example.fshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public Boolean productExistsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Transactional
    public Product saveProduct(Product product) { return productRepository.save(product);}
}
