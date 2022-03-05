package com.example.fshop.service;

import com.example.fshop.models.Category;
import com.example.fshop.models.Product;
import com.example.fshop.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {
    @MockBean
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    private Product productInstance;

    @BeforeEach
    void setUp() {
        String name = "Oculus Quest 2";
        String description = "Next-level Hardware. Make every move count with a blazing-fast processor" +
                "and our highest-resolution display";
        Category productCategory = new Category("Video Games", true);
        productCategory.setId("1");
        BigDecimal price = new BigDecimal("299.00");
        productInstance = new Product(name, description, price, 5, productCategory);
    }

    @Test
    void shouldCallExistsByNameMethodWhenCallProductExistsByNameMethod() {
        when(productRepository.existsByName(productInstance.getName())).thenReturn(true);

        assertEquals(true, productService.productExistsByName("Oculus Quest 2"));
        verify(productRepository).existsByName("Oculus Quest 2");
    }

    @Test
    void shouldSaveMethodReturnsCreatedProductWhenAProductInstanceSaved() {
        Product expectedProduct = new Product();
        BeanUtils.copyProperties(productInstance, expectedProduct);
        expectedProduct.setId("1");

        when(productRepository.save(productInstance)).thenReturn(expectedProduct);

        Product createdProduct = productService.saveProduct(productInstance);

        assertThat(createdProduct).isEqualTo(expectedProduct);
        verify(productRepository).save(productInstance);
    }
}
