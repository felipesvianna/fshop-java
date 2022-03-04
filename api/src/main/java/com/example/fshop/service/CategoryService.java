package com.example.fshop.service;

import com.example.fshop.models.Category;
import com.example.fshop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category registerNewCategory(Category categoryInstance) {
        return categoryRepository.save(categoryInstance);
    }

    public Boolean categoryAlreadyExists(String name) {
        return categoryRepository.existsByName(name);
    }
}
