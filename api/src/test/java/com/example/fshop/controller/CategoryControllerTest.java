package com.example.fshop.controller;

import com.example.fshop.models.Category;
import com.example.fshop.payload.Responses.ErrorResponse;
import com.example.fshop.repository.CategoryRepository;
import com.example.fshop.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${fshop.app.apiUrlBase}/categories/")
    private String API_URI_RESOURCE;

    final String contentData = "{\"name\":\"Books\"}";

    @BeforeEach
    void setUp() {
        categoryInstance = new Category("Books");
        categoryInstance.setActive(true);
        categoryInstance.setId("1");
    }

    @Test
    void shouldReturn404WHenCantFindCategoryOnDeleteHTTPMethodRequest() throws Exception{
        String categoryId = "2534";
        String requestUri = API_URI_RESOURCE + categoryId;

        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(), "Category not found");

        when(categoryService.findCategoryById(categoryId)).thenReturn(Optional.empty());

        mockMvc.perform(delete(requestUri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isNotFound())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(categoryService, times(0)).saveCategory(any());
    }

    @Test
    void shouldReturn204OnSuccessDeleteHTTPMethodRequest() throws Exception{
        String categoryId = "1";
        String requestUri = API_URI_RESOURCE + categoryId;
        Category updatedCategory = new Category("Books", false);
        updatedCategory.setId(categoryId);

        when(categoryService.findCategoryById(categoryId)).thenReturn(Optional.of(categoryInstance));
        when(categoryService.saveCategory(updatedCategory)).thenReturn(updatedCategory);

        mockMvc.perform(delete(requestUri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isNoContent());

        verify(categoryService).saveCategory(updatedCategory);
    }

    @Test
    void shouldReturnResponseError404AndWhenACategoryIsNotFound() throws Exception{
        String idToSearch = "23421";
        String requestUri = API_URI_RESOURCE + idToSearch;
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(), "Category not found");

        when(categoryService.findCategoryById(idToSearch)).thenReturn(Optional.empty());

        mockMvc.perform(get(requestUri)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));
    }

    @Test
    void shouldReturnCategoryWhenCallGetHTTPMethodWithIdAsParameter() throws Exception{
        String idToSearch = "1";
        String requestUri = API_URI_RESOURCE + idToSearch;

        when(categoryService.findCategoryById(idToSearch)).thenReturn(Optional.of(categoryInstance));

        mockMvc.perform(get(requestUri)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(categoryInstance)));

        verify(categoryService).findCategoryById(idToSearch);
    }

    @Test
    void shouldReturnResponseError404AndWhenCanNotUpdateCategoryName() throws Exception{
        String contentData = "{\"name\":\"Office\"}";
        String categoryId = "5432";
        String requestUri = API_URI_RESOURCE + categoryId;
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(), "Category not found");

        when(categoryService.findCategoryById(categoryId)).thenReturn(Optional.empty());

        mockMvc.perform(put(requestUri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isNotFound())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(categoryService).findCategoryById(categoryId);
    }

    @Test
    void shouldUpdateCategoryNameWhenCallPutHTTPMethod() throws Exception{
        String contentData = "{\"name\":\"Office\"}";
        String categoryId = "1";
        String requestUri = API_URI_RESOURCE + categoryId;
        Category updatedCategory = new Category("Office", true);
        updatedCategory.setId(categoryId);

        when(categoryService.findCategoryById(categoryId)).thenReturn(Optional.of(categoryInstance));
        when(categoryService.saveCategory(updatedCategory)).thenReturn(updatedCategory);

        mockMvc.perform(put(requestUri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedCategory)));

        verify(categoryService).saveCategory(updatedCategory);
    }

    @Test
    void shouldReturnAListOfCategoriesOnGetHTTPMethod() throws Exception{
        List<Category> categoryList = new ArrayList<>();
        Category anotherCategory = new Category("Office", true);
        anotherCategory.setId("2");
        categoryList.add(categoryInstance);
        categoryList.add(anotherCategory);

        String expectedContent = "["
                + "{" + "\"id\":\"1\"," + "\"name\":\"Books\"," + "\"active\":true" +"},"
                + "{" + "\"id\":\"2\"," + "\"name\":\"Office\"," + "\"active\":true" +"}"
                + "]";

        when(categoryService.getAllCategories()).thenReturn(categoryList);

        mockMvc.perform(get(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));
    }

    @Test
    void shouldSaveNewCategoryWithValidName() throws Exception {
        String expectedContent = objectMapper.writeValueAsString(categoryInstance);

        when(categoryService.saveCategory(any())).thenReturn(categoryInstance);

        mockMvc.perform(post(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isCreated())
                .andExpect(content().string(expectedContent));

        ArgumentCaptor<Category> argumentCaptor = ArgumentCaptor.forClass(Category.class);
        verify(categoryService).saveCategory(argumentCaptor.capture());
    }

    @Test
    void shouldReturnResponseError400WhenNewCategoryHasInvalidName() throws Exception {
        String contentData = "{\"name\":\"Bo\"}";

        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(), "name: size must be between 3 and 50");

        mockMvc.perform(post(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(categoryService, times(0)).saveCategory(any());
    }

    @Test
    void shouldReturnResponseError409WhenCategoryAlreadyExists() throws Exception{
        String categoryName = categoryInstance.getName();
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(), "Category already exists");

        when(categoryService.findCategoryByName(categoryName)).thenReturn(Optional.of(categoryInstance));

        mockMvc.perform(post(API_URI_RESOURCE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isConflict())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(categoryRepository, times(0)).save(any());
    }
}
