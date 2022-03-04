package com.example.fshop.controller;

import com.example.fshop.models.Category;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.repository.CategoryRepository;
import com.example.fshop.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;


import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ContextConfiguration
@WebAppConfiguration
public class CategoryControllerTest {
    private Category categoryInstance;

    @MockBean
    private CategoryService categoryService;

    @MockBean
    private CategoryRepository categoryRepository;

    @Autowired
    private Environment env;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @BeforeEach
    void setUp() {
        categoryInstance = new Category("Books");
        categoryInstance.setActive(true);
        categoryInstance.setId("1");
    }

    @Test
    void shouldReturnAListOfCategoriesOnGetHTTPMethod() throws Exception{
        List<Category> categoryList = new ArrayList<>();
        categoryList.add(categoryInstance);

        String expectedContent = "["
                + "{" + "\"id\":\"1\"," + "\"name\":\"Books\"," + "\"active\":true" +"}"
                + "]";

        when(categoryService.getAllCategories()).thenReturn(categoryList);

        mockMvc.perform(get(env.getProperty("fshop.app.apiUrlBase") + "/category/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));
    }

    @Test
    void shouldRegisterNewCategoryWithValidName() throws Exception {
        String contentData = "{\"name\":\"Books\"}";
        String expectedContent = objectMapper.writeValueAsString(categoryInstance);

        when(categoryService.registerNewCategory(any())).thenReturn(categoryInstance);

        mockMvc.perform(post(env.getProperty("fshop.app.apiUrlBase") + "/category/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isCreated())
                .andExpect(content().string(expectedContent));

        ArgumentCaptor<Category> argumentCaptor = ArgumentCaptor.forClass(Category.class);
        verify(categoryService).registerNewCategory(argumentCaptor.capture());
    }

    @Test
    void shouldReturnResponseError400AndWhenNewCategoryHasInvalidName() throws Exception {
        String contentData = "{\"name\":\"Bo\"}";

        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(), "name: size must be between 3 and 50");

        mockMvc.perform(post(env.getProperty("fshop.app.apiUrlBase")+"/category/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(categoryService, times(0)).registerNewCategory(any());
    }

    @Test
    void shouldReturnResponseError409WhenCategoryAlreadyExists() throws Exception{
        String categoryName = categoryInstance.getName();
        String contentData = "{\"name\":\"Books\"}";
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(), "Category already exists");

        when(categoryService.categoryAlreadyExists(categoryName)).thenReturn(true);

        mockMvc.perform(post(env.getProperty("fshop.app.apiUrlBase") + "/category/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isConflict())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(categoryRepository, times(0)).save(any());
    }
}
