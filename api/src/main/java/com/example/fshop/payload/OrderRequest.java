package com.example.fshop.payload;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class OrderRequest {
    @NotBlank
    private String total;

    List<String> productIdList;

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public List<String> getProductIdList() {
        return productIdList;
    }

    public void setProductIdList(List<String> productIdList) {
        this.productIdList = productIdList;
    }
}
