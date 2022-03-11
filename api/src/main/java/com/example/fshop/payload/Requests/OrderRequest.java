package com.example.fshop.payload.Requests;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class OrderRequest {

    public static class SelectedProduct {
        public SelectedProduct(String id, int quantity) {
            this.id = id;
            this.quantity = quantity;
        }

        public String id;
        public int quantity;

        public int getQuantity() {
            return quantity;
        }
    }

    List<SelectedProduct> productList;

    public List<SelectedProduct> getProductList() {
        return productList;
    }

    public void setProductList(List<SelectedProduct> productList) {
        this.productList = productList;
    }
}
