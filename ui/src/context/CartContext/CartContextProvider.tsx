import React, { FC } from "react";
import CartContext from ".";

type CartContextProps = {
  children: React.ReactNode;
};

const CartContextProvider: FC<CartContextProps> = ({ children }) => {
  const hardcodedList = [
    {
      id: 1,
      name: "Monitor",
      details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
      category: "Computers",
      quantity: 5,
      price: 2000.99,
    },
    {
      id: 2,
      name: "Headphones",
      details:
        "Unlike other brands that are heavy, bulky and cause fatigue, our ergonomic design optimizes comfort",
      category: "Eletronics",
      quantity: 10,
      price: 499.99,
    },
    {
      id: 3,
      name: "Shelf",
      details: "Two-tiered shelving unit system with modular, stackable design",
      category: "Home & Kitchen",
      quantity: 2,
      price: 120.99,
    },
  ];
  const providerValues = {
    itemsList: hardcodedList,
  };

  return (
    <CartContext.Provider value={providerValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
