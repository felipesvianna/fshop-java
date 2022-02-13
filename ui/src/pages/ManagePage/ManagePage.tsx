import React, { FC } from "react";
import Header from "../../components/Header/Header";
import { LinkButtonProps } from "../../interfaces";

const ManagePage: FC = () => {
  const headerLinks: LinkButtonProps[] = [
    { routeName: "/admin/manageproducts", pageName: "Manage products" },
  ];
  return (
    <>
      <Header pageName="Manage F-Shop" listOfLinks={headerLinks} />
    </>
  );
};

export default ManagePage;
