import React, { FC } from "react";
import { Link } from "react-router-dom";
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
            <Link key={index} to={"/productdetails/" + card.id}>
              <ProductCard key={index} name={card.name} price={card.price} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProductCardGrid;
