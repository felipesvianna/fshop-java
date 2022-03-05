package com.example.fshop.service;

import com.example.fshop.models.Product;
import com.example.fshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findByIsActiveTrue();
    }

    public Boolean productExistsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Transactional
    public Product saveProduct(Product product) { return productRepository.save(product);}
}
