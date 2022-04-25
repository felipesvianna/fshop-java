package com.example.fshop.controller;

import com.example.fshop.models.*;
import com.example.fshop.payload.Responses.ErrorResponse;
import com.example.fshop.payload.Requests.OrderRequest;
import com.example.fshop.repository.OrderRepository;
import com.example.fshop.service.OrderService;
import com.example.fshop.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
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
    void shouldReturnOrderWhenCallGetHTTPMethodWithIdAsParameter() throws Exception{
        String idToSearch = "1";
        String requestUri = API_URI_BASE + "/orders/" + idToSearch;

        when(orderService.findOrderById(idToSearch)).thenReturn(Optional.of(orderInstance));

        mockMvc.perform(get(requestUri)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(orderInstance)));

        verify(orderService).findOrderById(idToSearch);
    }

    @Test
    void shouldReturnResponseError404AndWhenACategoryIsNotFound() throws Exception{
        String idToSearch = "1";
        String requestUri = API_URI_BASE + "/orders/" + idToSearch;
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(), "Order not found");

        when(orderService.findOrderById(idToSearch)).thenReturn(Optional.empty());

        mockMvc.perform(get(requestUri)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string(objectMapper.writeValueAsString(expectedContent)));
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
        String userId = orderInstance.getCustomer().getId();
        User userInstance = orderInstance.getCustomer();
        List<Order> ordersList = new ArrayList<>();
        ordersList.add(orderInstance);

        String expectedContent = objectMapper.writeValueAsString(ordersList);

        when(userService.findUserById(userId)).thenReturn(Optional.of(userInstance));
        when(orderService.getAllOrdersFromUser(any())).thenReturn(ordersList);

        mockMvc.perform(get(API_URI_BASE + "/users/" + userId + "/orders")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedContent));

        ArgumentCaptor<String> argumentCaptor = ArgumentCaptor.forClass(String.class);
        verify(orderService).getAllOrdersFromUser(argumentCaptor.capture());
    }

    @Test
    void shouldReturnResponseError409WhenOrderAlreadyExists() throws Exception{
        String userId = orderInstance.getCustomer().getId();
        User userInstance = orderInstance.getCustomer();
        OrderRequest orderRequest = new OrderRequest();
        OrderRequest.SelectedProduct productOne = new OrderRequest.SelectedProduct("1", 5);
        OrderRequest.SelectedProduct productTwo = new OrderRequest.SelectedProduct("2", 10);
        List<OrderRequest.SelectedProduct> productList = new ArrayList<>();
        productList.add(productOne);
        productList.add(productTwo);

        orderRequest.setProductList(productList);

        String contentData = objectMapper.writeValueAsString(orderRequest);
        ErrorResponse expectedContent = new ErrorResponse(HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(), "Order already exists");

        when(userService.findUserById(userId)).thenReturn(Optional.of(userInstance));
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
        List<OrderRequest.SelectedProduct> selectedProductList = new ArrayList<>();
        User userInstance = orderInstance.getCustomer();
        String userId = userInstance.getId();

        OrderRequest orderRequest = new OrderRequest();
        OrderRequest.SelectedProduct productOne = new OrderRequest.SelectedProduct("1", 5);
        OrderRequest.SelectedProduct productTwo = new OrderRequest.SelectedProduct("2", 10);
        selectedProductList.add(productOne);
        selectedProductList.add(productTwo);
        orderRequest.setProductList(selectedProductList);

        String contentData = objectMapper.writeValueAsString(orderRequest);
        String expectedContent = objectMapper.writeValueAsString(orderInstance);

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
