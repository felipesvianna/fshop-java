package com.example.fshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Objects;

@Document("products")
public class Product {
    @Id
    private String id;

    @NotBlank
    @Size(min = 3, max=50)
    private String name;

    @NotBlank
    @Size(min = 3, max=255)
    private String description;

    @NotBlank
    private BigDecimal price;

    @NotBlank
    private int stockQuantity;

    @DBRef
    private Category category;

    @JsonIgnore
    private Boolean isOnSale;

    public Product() {}

    public Product(String name, String description, BigDecimal price, int stockQuantity, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.category = category;
        this.setOnSale(true);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = new BigDecimal(price);
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Boolean getOnSale() {
        return isOnSale;
    }

    public void setOnSale(Boolean active) {
        isOnSale = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product)) return false;
        Product product = (Product) o;
        return id.equals(product.id) && name.equals(product.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
