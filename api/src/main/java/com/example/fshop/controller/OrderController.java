package com.example.fshop.controller;

import com.example.fshop.models.Category;
import com.example.fshop.models.Order;
import com.example.fshop.models.Product;
import com.example.fshop.models.User;
import com.example.fshop.payload.ErrorResponse;
import com.example.fshop.payload.OrderRequest;
import com.example.fshop.payload.ProductRequest;
import com.example.fshop.service.OrderService;
import com.example.fshop.service.ProductService;
import com.example.fshop.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${fshop.app.apiUrlBase}")
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    ProductService productService;

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authenticationManager;

    @GetMapping("/users/{userId}/orders")
    public ResponseEntity<Object> getAllOrdersFromUser(@PathVariable(value = "userId") String userId) {
        if(userService.findUserById(userId).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Customer not found"));
        }
        List<Order> ordersList = orderService.getAllOrdersFromUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(ordersList);
    }

    @PostMapping("/users/{userId}/orders")
    public ResponseEntity<Object> registerNewOrder(@RequestBody @Valid OrderRequest orderRequest, @PathVariable(value = "userId") String userId) {

        int generatedNumber = Math.abs((int)Math.floor(Math.random()*(0-100+1)+1));

        if(orderService.orderAlreadyExists(generatedNumber)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(HttpStatus.CONFLICT.value(),
                            HttpStatus.CONFLICT.getReasonPhrase(), "Order already exists"));
        }

        List<Product> productsList = new ArrayList<Product>();
        Optional<User> currentUser = userService.findUserById(userId);

        Order newOrder = new Order();
        newOrder.setNumber(generatedNumber);
        newOrder.setTotal(new BigDecimal(orderRequest.getTotal()));
        newOrder.setDateCreated(LocalDateTime.now(ZoneId.of("UTC")));
        newOrder.setCustomer(currentUser.get());

        List<String> productsIds = orderRequest.getProductIdList();
        productsIds.forEach(productId -> {
            Optional<Product> productFound = productService.findProductById(productId);
            if(productFound.isPresent()){
                productsList.add(productFound.get());
            }
        });

        newOrder.setProductList(productsList);

        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.saveOrder(newOrder));
    }
}
