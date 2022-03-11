package com.example.fshop.controller;

import com.example.fshop.models.Category;
import com.example.fshop.payload.Requests.CategoryRequest;
import com.example.fshop.payload.Responses.ErrorResponse;
import com.example.fshop.service.CategoryService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${fshop.app.apiUrlBase}/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> removeCategory(@PathVariable(value = "id") String id) {
        Optional<Category> categoryFound = categoryService.findCategoryById(id);
        if(categoryFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Category not found"));
        }
        Category updatedCategory = categoryFound.get();
        updatedCategory.setActive(false);
        categoryService.saveCategory(updatedCategory);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCategory(@PathVariable(value = "id") String id){
        Optional<Category> categoryFound = categoryService.findCategoryById(id);
        if(categoryFound.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Category not found"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(categoryFound.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategoryName(
            @RequestBody @Valid CategoryRequest categoryRequest,
            @PathVariable(value = "id") String id)
    {
        Optional<Category> categoryFound = categoryService.findCategoryById(id);
        if(categoryFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Category not found"));
        }
        Category updatedCategory = categoryFound.get();
        BeanUtils.copyProperties(categoryRequest, updatedCategory);
        updatedCategory.setName(categoryRequest.getName());
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.saveCategory(updatedCategory));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<Object> registerNewCategory(@RequestBody @Valid CategoryRequest categoryRequest) {
        Category newCategory = new Category();

        BeanUtils.copyProperties(categoryRequest, newCategory);
        Optional<Category> categoryFound = categoryService.findCategoryByName(categoryRequest.getName());

        if(categoryFound.isPresent()) {
            newCategory = categoryFound.get();

            if(newCategory.getActive()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse(HttpStatus.CONFLICT.value(),
                                HttpStatus.CONFLICT.getReasonPhrase(), "Category already exists"));
            }
        }

        newCategory.setActive(true);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.saveCategory(newCategory));
    }
}
