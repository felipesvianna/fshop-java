package com.example.fshop.controller;

import com.example.fshop.models.Category;
import com.example.fshop.payload.CategoryRequest;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.service.CategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/category/")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<Object> saveCategory(@RequestBody @Valid CategoryRequest categoryRequest) {
        if(categoryService.categoryAlreadyExists(categoryRequest.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(HttpStatus.CONFLICT.value(),
                            HttpStatus.CONFLICT.getReasonPhrase(), "Category already exists"));
        }

        var newCategory = new Category();
        BeanUtils.copyProperties(categoryRequest, newCategory);
        newCategory.setActive(true);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.registerNewCategory(newCategory));
    }
}
