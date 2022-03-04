package com.example.fshop.service;

import com.example.fshop.models.Category;
import com.example.fshop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Optional<Category> findCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    public Optional<Category> findCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findByIsActiveTrue();
    }

    @Transactional
    public Category saveCategory(Category categoryInstance) {
        return categoryRepository.save(categoryInstance);
    }

    public Boolean categoryAlreadyExists(String name) {
        return categoryRepository.existsByName(name);
    }
}
