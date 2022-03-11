package com.example.fshop.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Document("orders")
public class Order {
    @Id
    private String id;

    @NotBlank
    private int number;

    @NotBlank
    private BigDecimal total;

    private Boolean isPaid;

    @NotBlank
    private LocalDateTime dateCreated;

    private LocalDateTime paymentDate;

    @DBRef
    private User customer;

    @DBRef
    List<ProductOrder> productList;

    public Order() {}

    public Order(BigDecimal total, LocalDateTime dateCreated, List<ProductOrder> productList) {
        this.total = total;
        this.dateCreated = dateCreated;
        this.productList = productList;
        this.setPaid(false);
        this.setPaymentDate(null);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Boolean getPaid() {
        return isPaid;
    }

    public void setPaid(Boolean paid) {
        isPaid = paid;
    }

    public List<ProductOrder> getProductList() {
        return productList;
    }

    public void setProductList(List<ProductOrder> productList) {
        this.productList = productList;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}
