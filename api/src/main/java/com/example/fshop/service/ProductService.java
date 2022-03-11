package com.example.fshop.service;

import com.example.fshop.models.Product;
import com.example.fshop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    public Optional<Product> findProductById(String productId) { return productRepository.findById(productId); }

    public List<Product> getAllProducts() {
        return productRepository.findByIsOnSaleIsTrue();
    }

    public Boolean productExistsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Transactional
    public Product saveProduct(Product product) { return productRepository.save(product);}
}
