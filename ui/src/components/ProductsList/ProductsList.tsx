import React, { FC } from "react";
import { ProductProps } from "../Product/Product";

interface ProductsListProps {
  listOfProducts?: ProductProps[];
}

const ProductsList: FC<ProductsListProps> = ({
  listOfProducts = [],
}: ProductsListProps) => {
  if (Array.isArray(listOfProducts) && !listOfProducts.length) {
    return <p>There is no products.</p>;
  }

  return (
    <table id="products-list" className="table-auto divide-y divide-gray-300">
      <thead className="border-b bg-gray-50">
        <tr>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">Name</th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Category
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">
            Quantity
          </th>
        </tr>
      </thead>
      <tbody>
        {listOfProducts.map((product) => {
          return (
            <tr className="bg-white border-b" key={product.quantity}>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.quantity}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsList;
