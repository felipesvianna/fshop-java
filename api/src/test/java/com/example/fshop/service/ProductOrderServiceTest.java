package com.example.fshop.service;

import com.example.fshop.models.Category;
import com.example.fshop.models.Product;
import com.example.fshop.models.ProductOrder;
import com.example.fshop.repository.ProductOrderRepository;
import com.example.fshop.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class ProductOrderServiceTest {
    @MockBean
    ProductOrderRepository productOrderRepository;

    @Autowired
    ProductOrderService productOrderService;

    private ProductOrder productOrderInstance;

    @BeforeEach
    void setUp() {
        String name = "Oculus Quest 2";
        String description = "Next-level Hardware. Make every move count with a blazing-fast processor" +
                "and our highest-resolution display";
        Category productCategory = new Category("Video Games", true);
        productCategory.setId("1");
        BigDecimal price = new BigDecimal("299.00");
        Product product = new Product(name, description, price, 5, productCategory);

        productOrderInstance = new ProductOrder(product, 3);
    }

    @Test
    void shouldSaveMethodReturnsCreatedProductWhenAProductInstanceSaved() {
        ProductOrder expectedProduct = new ProductOrder();
        BeanUtils.copyProperties(productOrderInstance, expectedProduct);
        expectedProduct.setId("1");

        when(productOrderRepository.save(productOrderInstance)).thenReturn(expectedProduct);

        ProductOrder createdProductOrder = productOrderService.saveProductOrder(productOrderInstance);

        assertThat(createdProductOrder).isEqualTo(expectedProduct);
        verify(productOrderRepository).save(productOrderInstance);
    }
}
