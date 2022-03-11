package com.example.fshop.service;

import com.example.fshop.models.*;
import com.example.fshop.repository.CategoryRepository;
import com.example.fshop.repository.OrderRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
    @MockBean
    OrderRepository orderRepository;

    @Autowired
    OrderService orderService;

    private Order orderInstance;

    private static final List<ProductOrder> productList = new ArrayList<>();

    @BeforeAll
    public static void init() {
        Product productOne = new Product();

        String name = "Oculus Quest 2";
        String description = "Next-level Hardware. Make every move count with a blazing-fast processor" +
                "and our highest-resolution display";
        Category productCategory = new Category("Video Games", true);
        productCategory.setId("1");
        BigDecimal price = new BigDecimal("299.00");
        productOne = new Product(name, description, price, 5, productCategory);

        ProductOrder productInstance = new ProductOrder(productOne, 1);

        productList.add(productInstance);
    }

    @BeforeEach
    void setUp() {
        Set<Role> authorities = new HashSet<>();
        authorities.add(new Role(ERoles.ROLE_CLIENT));
        User userInstance = new User(
                "asouza@email.com",
                "Airton",
                "Souza",
                "Rua das Laranjeiras 12",
                "asouza@email.com",
                "senhasenha");
        userInstance.setId("1");
        userInstance.setRoles(authorities);
        BigDecimal orderTotal = new BigDecimal("1000.00");
        LocalDateTime creationDate = LocalDateTime.now(ZoneId.of("UTC"));
        orderInstance = new Order(orderTotal, creationDate, productList);
        orderInstance.setNumber(123456);
        orderInstance.setCustomer(userInstance);
        orderInstance.setId("1");
    }

    @Test
    void shouldCallFindAllMethodWhenCallGetAllOrdersFromUserMethod() {
        String userIdToFind = orderInstance.getCustomer().getId();
        List<Order> expectedList = new ArrayList<>();
        expectedList.add(orderInstance);

        when(orderRepository.findOrdersByCustomerId(userIdToFind)).thenReturn(expectedList);

        List<Order> productsFound = orderService.getAllOrdersFromUser(userIdToFind);

        assertEquals(expectedList, productsFound);
        verify(orderRepository).findOrdersByCustomerId(userIdToFind);
    }

    @Test
    void shouldCallExistsByNumberMethodWhenCallOrderAlreadyExistsMethod() {
        when(orderRepository.existsByNumber(orderInstance.getNumber())).thenReturn(true);

        assertEquals(true, orderService.orderAlreadyExists(123456));
        verify(orderRepository).existsByNumber(123456);
    }

    @Test
    void shouldCallSaveMethodWhenAOrderInstanceIsValid() {
        when(orderRepository.save(orderInstance)).thenReturn(orderInstance);

        Order createdOrder = orderService.saveOrder(orderInstance);

        assertThat(createdOrder).isEqualTo(orderInstance);
        verify(orderRepository).save(orderInstance);
    }
}
