import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { ProductProps } from "../../interfaces";

interface ProductDetailsProps {
  productData?: ProductProps;
}

const ProductDetails: FC<ProductDetailsProps> = ({ productData }) => {
  const { idProduct } = useParams();

  if (!productData) {
    productData = {
      id: 1,
      name: "Monitor",
      details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
      category: "Computers",
      quantity: 5,
      price: 2000.57,
    };
  }
  return (
    <>
      <Header pageName="F-Shop" />
      <div>
        <p>{productData?.name}</p>
        <p>{productData?.category}</p>
        <p>{productData?.details}</p>
        <p>{productData?.quantity}</p>
        <p>{productData?.price}</p>
      </div>
      <div>
        <button
          className="block mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          name="addToCart"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
