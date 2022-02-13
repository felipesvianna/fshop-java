import React, { FC } from "react";
import { Link } from "react-router-dom";
import { LinkButtonProps } from "../../interfaces";

const LinkButton: FC<LinkButtonProps> = ({ routeName, pageName }) => {
  return (
    <Link className="text-blue-600 underline mx-4" to={routeName}>
      {pageName}
    </Link>
  );
};

export default LinkButton;
