import React, { FC, useContext } from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import CartContext from "../../context/CartContext";
import { LinkButtonProps } from "../../interfaces";
import LinkButton from "../LinkButton/LinkButton";

interface HeaderProps {
  pageName: string;
  listOfLinks?: LinkButtonProps[];
}
const Header: FC<HeaderProps> = ({ pageName, listOfLinks }) => {
  const authenticationContext = useContext(AuthenticationContext);
  const cartContext = useContext(CartContext);

  const { isAuthenticated } = authenticationContext;
  const { itemsList } = cartContext;

  return (
    <header className="flex justify-between my-4">
      <div>
        <p className="font-bold">{pageName}</p>
        <div className="mt-4">
          {listOfLinks?.map((link, index) => {
            return (
              <LinkButton
                key={index}
                routeName={link.routeName}
                linkName={link.linkName}
              />
            );
          })}
        </div>
      </div>
      <div>
        {isAuthenticated ? (
          <LinkButton routeName="/logout" linkName="Logout" />
        ) : (
          <LinkButton routeName="/signin" linkName="Sign in" />
        )}

        {
          <LinkButton
            routeName="/cart"
            linkName={"Cart(" + itemsList.length + ")"}
          />
        }
      </div>
    </header>
  );
};

export default Header;
