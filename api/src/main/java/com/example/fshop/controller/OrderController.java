package com.example.fshop.controller;

import com.example.fshop.models.*;
import com.example.fshop.payload.Responses.ErrorResponse;
import com.example.fshop.payload.Requests.OrderRequest;
import com.example.fshop.service.OrderService;
import com.example.fshop.service.ProductOrderService;
import com.example.fshop.service.ProductService;
import com.example.fshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.transaction.annotation.Transactional;
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
    ProductOrderService productOrderService;

    @Autowired
    AuthenticationManager authenticationManager;

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<Object> getOrder(@PathVariable(value = "orderId") String id){
        Optional<Order> orderFound = orderService.findOrderById(id);
        if(orderFound.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Order not found"));
        }
        return ResponseEntity.status(HttpStatus.OK).body(orderFound.get());
    }

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

    // @Transactional
    @PostMapping("/users/{userId}/orders")
    public ResponseEntity<Object> registerNewOrder(@RequestBody @Valid OrderRequest orderRequest, @PathVariable(value = "userId") String userId) {
        List<ProductOrder> products = new ArrayList<>();
        Optional<User> currentUser = userService.findUserById(userId);
        List<OrderRequest.SelectedProduct> productList = orderRequest.getProductList();
        int generatedNumber = Math.abs((int)Math.floor(Math.random()*(0-100+1)+1));

        if(currentUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                            HttpStatus.NOT_FOUND.getReasonPhrase(), "Customer not found"));
        }

        if(orderService.orderAlreadyExists(generatedNumber)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(HttpStatus.CONFLICT.value(),
                            HttpStatus.CONFLICT.getReasonPhrase(), "Order already exists"));
        }

        try {
            for(OrderRequest.SelectedProduct product : productList) {
                Optional<Product> productFound = productService.findProductById(product.id);
                if(productFound.isPresent()){
                    ProductOrder productOrder = new ProductOrder(productFound.get(), product.getQuantity());
                    products.add(productOrder);
                    productOrderService.saveProductOrder(productOrder);
                }
            }

            Order orderToSave = this.buildOrder(generatedNumber, currentUser.get(), products);
            return ResponseEntity.status(HttpStatus.CREATED).body(orderService.saveOrder(orderToSave));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                            HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(), e.getMessage()));
        }
    }

    protected Order buildOrder(int number, User customer, List<ProductOrder> productsList) {
        Order newOrder = new Order();
        BigDecimal itemCost = BigDecimal.ZERO;
        BigDecimal total = BigDecimal.ZERO;

        newOrder.setNumber(number);
        newOrder.setDateCreated(LocalDateTime.now(ZoneId.of("UTC")));
        newOrder.setCustomer(customer);
        newOrder.setPaid(false);

        for(ProductOrder product : productsList) {
            itemCost = product.getProduct().getPrice();
            itemCost  = itemCost.multiply(BigDecimal.valueOf(product.getQuantity()));
            total = total.add(itemCost);
        }

        newOrder.setTotal(total);
        newOrder.setProductList(productsList);

        return newOrder;
    }
}
