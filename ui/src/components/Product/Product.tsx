import React, { FC } from "react";
export type ProductProps = {
  name?: string;
  category?: string;
  quantity: number;
};

const Product: FC<ProductProps> = (productData) => {
  return (
    <tr>
      <td>
        <span id="product-name">{productData.name}</span>
        <span id="product-category">{productData.category}</span>
        <span id="product-quantity">{productData.quantity}</span>
      </td>
    </tr>
  );
};

export default Product;
