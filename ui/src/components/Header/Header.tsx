import React, { FC } from "react";
import LinkButton, { LinkButtonProps } from "../LinkButton/LinkButton";

interface HeaderProps {
  pageName: string;
  listOfLinks?: LinkButtonProps[];
}
const Header: FC<HeaderProps> = ({ pageName, listOfLinks }) => {
  return (
    <header className="my-4">
      <p className="font-bold">{pageName}</p>
      <div className="mt-4">
        {listOfLinks?.map((link, index) => {
          return (
            <LinkButton
              key={index}
              routeName={link.routeName}
              pageName={link.pageName}
            />
          );
        })}
      </div>
    </header>
  );
};

export default Header;
