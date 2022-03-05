package com.example.fshop.controller;
import com.example.fshop.models.Category;
import com.example.fshop.models.Product;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.payload.ProductRequest;
import com.example.fshop.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ContextConfiguration
@WebAppConfiguration
public class ProductControllerTest {
    private Product productInstance;

    @MockBean
    ProductService productService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @Value("${fshop.app.apiUrlBase}/products/")
    private String API_URI_RESOURCE;

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
    void shouldReturnResponseError409WhenProductNameAlreadyExists() throws Exception{
        ProductRequest productRequest = new ProductRequest();
        BeanUtils.copyProperties(productInstance, productRequest);
        productRequest.setPrice(productInstance.getPrice().toString());
        productRequest.setQuantity("5");
        productRequest.setCategoryId("1");

        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(), "Product already exists");

        String productName = productInstance.getName();
        String contentData = objectMapper.writeValueAsString(productRequest);

        when(productService.productExistsByName(productName)).thenReturn(true);

        mockMvc.perform(post(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isConflict())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(productService, times(0)).saveProduct(any());
    }

    @Test
    void shouldReturnResponseError400WhenNewProductHasInvalidData() throws Exception {
        ProductRequest productRequest = new ProductRequest();
        productRequest.setName("Pr");
        productRequest.setDescription("Lorem ipsum");
        productRequest.setQuantity("5");
        productRequest.setPrice("12.00");

        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(), "name: size must be between 3 and 50");

        String contentData = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(post(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(productService, times(0)).saveProduct(any());
    }

    @Test
    void shouldSaveNewProductWithValidData() throws Exception {
        ProductRequest productRequest = new ProductRequest();
        BeanUtils.copyProperties(productInstance, productRequest);
        productRequest.setPrice(productInstance.getPrice().toString());
        productRequest.setQuantity("5");
        productRequest.setCategoryId("1");

        String contentData = objectMapper.writeValueAsString(productRequest);
        String expectedContent = objectMapper.writeValueAsString(productInstance);

        when(productService.saveProduct(any())).thenReturn(productInstance);

        mockMvc.perform(post(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isCreated())
                .andExpect(content().string(expectedContent));

        ArgumentCaptor<Product> argumentCaptor = ArgumentCaptor.forClass(Product.class);
        verify(productService).saveProduct(argumentCaptor.capture());
    }
}
