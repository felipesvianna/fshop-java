import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductProps } from "../../interfaces";

const Product: FC<ProductProps> = (productData) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 whitespace-nowrap">{productData.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{productData.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">{productData.quantity}</td>
      <td className="px-6 py-4 whitespace-nowrap">{productData.price}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link to={"/admin/editproduct/" + productData.id}>
          <button
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            type="submit"
          >
            Edit
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default Product;
