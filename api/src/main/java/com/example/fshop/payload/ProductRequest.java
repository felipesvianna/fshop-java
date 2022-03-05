package com.example.fshop.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ProductRequest {
    @NotBlank
    @Size(min = 3, max=50)
    private String name;

    @NotBlank
    @Size(min = 3, max=255)
    private String description;

    @NotBlank
    private String price;

    @NotBlank
    private String quantity;

    private String categoryId;

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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
