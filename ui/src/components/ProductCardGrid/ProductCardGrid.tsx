import React, { FC } from "react";
import ProductCard, { ProductCardProps } from "../ProductCard/ProductCard";

interface ProductCardGridProps {
  cardsList: ProductCardProps[];
}

const ProductCardGrid: FC<ProductCardGridProps> = ({ cardsList }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {cardsList.map((card, index) => {
          return (
            <ProductCard key={index} name={card.name} price={card.price} />
          );
        })}
      </div>
    </>
  );
};

export default ProductCardGrid;
