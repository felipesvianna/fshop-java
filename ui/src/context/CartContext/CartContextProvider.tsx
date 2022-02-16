import React, { FC } from "react";
import CartContext from ".";

type CartContextProps = {
  children: React.ReactNode;
};

const CartContextProvider: FC<CartContextProps> = ({ children }) => {
  const providerValues = {
    itemsList: [],
  };
  return (
    <CartContext.Provider value={providerValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
