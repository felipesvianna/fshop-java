import React, { FC } from "react";
export type ProductProps = {
  name?: string;
  category?: string;
  quantity: number;
  price: number;
};

const Product: FC<ProductProps> = (productData) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 whitespace-nowrap">{productData.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{productData.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">{productData.quantity}</td>
      <td className="px-6 py-4 whitespace-nowrap">{productData.price}</td>
    </tr>
  );
};

export default Product;
