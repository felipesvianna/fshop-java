import React, { FC } from "react";
import LinkButton from "../../components/LinkButton/LinkButton";

const ManagePage: FC = () => {
  return (
    <>
      <p className="font-bold my-4">Manage F-Shop</p>
      <LinkButton
        routeName={"/admin/manageproducts"}
        linkName={"Manage products"}
      />
    </>
  );
};

export default ManagePage;
