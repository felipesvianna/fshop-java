package com.example.fshop.service;

import com.example.fshop.models.Category;
import com.example.fshop.repository.CategoryRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @MockBean
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    private Category categoryInstance;

    @BeforeEach
    void setUp() {
        categoryInstance = new Category("Cars");
        categoryInstance.setActive(true);
        categoryInstance.setId("1");
    }

    @Test
    void shouldCallFindByNameMethodWhenCallGetCategoryMethod() {
        when(categoryRepository.findByName(categoryInstance.getName())).thenReturn(Optional.of(categoryInstance));

        Optional<Category> categoryFound = categoryService.findCategoryByName("Cars");

        verify(categoryRepository).findByName("Cars");

        assertThat(categoryFound.get()).isEqualTo(categoryInstance);
    }

    @Test
    void shouldCallFindByIdMethodWhenCallGetCategoryMethod() {
        when(categoryRepository.findById(categoryInstance.getId())).thenReturn(Optional.of(categoryInstance));

        Optional<Category> categoryFound = categoryService.findCategoryById("1");

        verify(categoryRepository).findById("1");

        assertThat(categoryFound.get()).isEqualTo(categoryInstance);
    }

    @Test
    void shouldCallFindAllMethodWhenCallGetAllCategoriesMethod() {
        List<Category> expectedList = new ArrayList<>();
        expectedList.add(categoryInstance);

        when(categoryRepository.findByIsActiveTrue()).thenReturn(expectedList);

        List<Category> categoriesFound = categoryService.getAllCategories();

        verify(categoryRepository).findByIsActiveTrue();

        assertEquals(expectedList, categoriesFound);
    }

    @Test
    void shouldCallSaveMethodWhenACategoryInstanceIsValid() {
        Category newCategory = new Category("Books", true);
        when(categoryRepository.save(categoryInstance)).thenReturn(categoryInstance);

        Category createdCategory = categoryService.saveCategory(categoryInstance);

        verify(categoryRepository).save(categoryInstance);

        assertThat(createdCategory).isEqualTo(categoryInstance);
    }

    @Test
    void shouldReturnTrueWhenACategoryNameAlreadyExists() {
        Category categoryInstance = new Category("categoryName");

        when(categoryRepository.existsByName(categoryInstance.getName())).thenReturn(true);

        assertEquals(true, categoryService.categoryAlreadyExists("categoryName"));
    }
}
