package com.example.fshop.controller;

import com.example.fshop.models.*;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.payload.OrderRequest;
import com.example.fshop.payload.ProductRequest;
import com.example.fshop.repository.OrderRepository;
import com.example.fshop.service.OrderService;
import com.example.fshop.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

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
public class OrderControllerTest {
    @MockBean
    OrderService orderService;

    @MockBean
    OrderRepository orderRepository;

    @MockBean
    UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @Value("${fshop.app.apiUrlBase}")
    private String API_URI_BASE;

    private Order orderInstance;

    private static final List<Product> productList = new ArrayList<>();

    @BeforeAll
    public static void init() {

        Product productInstance = new Product(
                "Dog supplies automatic feeder",
                "water dispenser 3.8L portable dog water bottle bowl (Color : A, Size : 3.8L) ",
                new BigDecimal("99.00"),
                5,
                new Category("Pet Supplies", true));
        productInstance.setId("1");
        productInstance.setActive(true);

        Product anotherProduct = new Product(
                "Pokemon Assorted Cards, 50 Pieces ",
                "YOUR BEST VALUE ON POKEMON CARDS: Look no further for the best deals on assorted Pokemon cards. ",
                new BigDecimal("6.81"),
                24,
                new Category("Toys and Games", true));
        anotherProduct.setId("2");
        anotherProduct.setActive(true);

        productList.add(anotherProduct);
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
    void shouldReturnResponseError404AndWhenAUserIsNotFound() throws Exception{
        String idToSearch = "23421";
        String requestUri = API_URI_BASE + "/users/" + idToSearch + "/orders";
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(), "Customer not found");

        when(userService.findUserById(idToSearch)).thenReturn(Optional.empty());
        when(orderService.getAllOrdersFromUser(any())).thenThrow(new RuntimeException());

        mockMvc.perform(get(requestUri)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(orderService, times(0)).getAllOrdersFromUser(any());
    }

    @Test
    void shouldReturnAListOfOrdersFromCustomerOnGetHTTPMethod() throws Exception{
        String userIdToFind = orderInstance.getCustomer().getId();
        List<Order> ordersList = new ArrayList<>();
        ordersList.add(orderInstance);

        String expectedContent = objectMapper.writeValueAsString(ordersList);

        when(orderService.getAllOrdersFromUser(any())).thenReturn(ordersList);

        mockMvc.perform(get(API_URI_BASE + "/users/" + userIdToFind + "/orders")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));

        ArgumentCaptor<String> argumentCaptor = ArgumentCaptor.forClass(String.class);
        verify(orderService).getAllOrdersFromUser(argumentCaptor.capture());
    }

    @Test
    void shouldReturnResponseError409WhenOrderAlreadyExists() throws Exception{
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setTotal("123.99");
        List<String> productIdsList = Arrays.asList("1", "2");
        orderRequest.setProductIdList(productIdsList);
        String userId = orderInstance.getCustomer().getId();

        String contentData = objectMapper.writeValueAsString(orderRequest);
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(), "Order already exists");

        when(orderService.orderAlreadyExists(anyInt())).thenReturn(true);

        mockMvc.perform(post(API_URI_BASE + "/users/" + userId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isConflict())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));

        verify(orderRepository, times(0)).save(any());
    }

    @Test
    void shouldSaveNewOrderWithValidData() throws Exception {
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.setTotal("123.99");
        List<String> productIdsList = Arrays.asList("1", "2");
        orderRequest.setProductIdList(productIdsList);

        String contentData = objectMapper.writeValueAsString(orderRequest);
        String expectedContent = objectMapper.writeValueAsString(orderInstance);

        String userId = orderInstance.getCustomer().getId();
        User userInstance = orderInstance.getCustomer();

        when(userService.findUserById(userId)).thenReturn(Optional.of(userInstance));
        when(orderService.saveOrder(any())).thenReturn(orderInstance);

        mockMvc.perform(post(API_URI_BASE + "/users/" + userId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(contentData))
                .andExpect(status().isCreated())
                .andExpect(content().string(expectedContent));

        ArgumentCaptor<Order> argumentCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderService).saveOrder(argumentCaptor.capture());
    }
}
