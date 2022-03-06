package com.example.fshop.controller;

import com.example.fshop.models.Category;
import com.example.fshop.models.Product;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.payload.ProductRequest;
import com.example.fshop.service.CategoryService;
import com.example.fshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${fshop.app.apiUrlBase}/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @Autowired
    CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProduct(@PathVariable(value = "id") String id){
        Optional<Product> productFound = productService.findProductById(id);
        if(productFound.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Product not found"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(productFound.get());
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<Object> registerNewProduct(@RequestBody @Valid ProductRequest productRequest) {
        if(productService.productExistsByName(productRequest.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(HttpStatus.CONFLICT.value(),
                            HttpStatus.CONFLICT.getReasonPhrase(), "Product already exists"));
        }

        Product newProduct = new Product();
        newProduct.setName(productRequest.getName());
        newProduct.setDescription(productRequest.getDescription());
        newProduct.setQuantity(Integer.parseInt(productRequest.getQuantity()));
        newProduct.setPrice(productRequest.getPrice());
        newProduct.setActive(true);

        Optional<Category> category = categoryService.findCategoryById(productRequest.getCategoryId());
        if(category.isPresent()) {
            newProduct.setCategory(category.get());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(productService.saveProduct(newProduct));
    }
}
