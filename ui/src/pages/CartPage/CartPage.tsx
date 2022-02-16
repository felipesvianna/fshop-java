import React, { FC, useContext } from "react";
import Cart from "../../components/Cart/Cart";
import Header from "../../components/Header/Header";
import CartContext from "../../context/CartContext";
import { CartProps } from "../../interfaces";
type CartPageProps = {
  listOfItems?: CartProps[];
};

const CartPage: FC<CartPageProps> = ({ listOfItems }) => {
  const cartContext = useContext(CartContext);
  const { itemsList } = cartContext;

  return (
    <>
      <Header pageName="Shopping Cart" />
      {itemsList.length === 0 ? (
        <p id="empty-message">Your cart is empty.</p>
      ) : (
        <Cart itemsList={itemsList} />
      )}
    </>
  );
};

export default CartPage;
