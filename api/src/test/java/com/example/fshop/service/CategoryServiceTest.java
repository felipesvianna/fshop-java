package com.example.fshop.service;

import com.example.fshop.models.Category;
import com.example.fshop.models.User;
import com.example.fshop.repository.CategoryRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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
        categoryInstance = new Category("categoryName");
        categoryInstance.setActive(true);
        categoryInstance.setId("1");
    }

    @Test
    void shouldCallFindAllMethodWhenCallGetAllCategoriesMethod() {
        List<Category> expectedList = new ArrayList<>();
        expectedList.add(categoryInstance);

        when(categoryRepository.findAll()).thenReturn(expectedList);

        List<Category> categoriesFound = categoryService.getAllCategories();

        verify(categoryRepository).findAll();

        assertEquals(expectedList, categoriesFound);
    }

    @Test
    void shouldCallSaveMethodWhenACategoryInstanceIsValid() {
        Category newCategory = new Category("Books", true);
        when(categoryRepository.save(categoryInstance)).thenReturn(categoryInstance);

        Category createdCategory = categoryService.registerNewCategory(categoryInstance);

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
