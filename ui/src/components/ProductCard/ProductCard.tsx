import React, { FC } from "react";
import { ProductCardProps } from "../../interfaces";

const ProductCard: FC<ProductCardProps> = ({ name, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-base mb-2">{name}</div>
        <p className="text-gray-700 text-base">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
