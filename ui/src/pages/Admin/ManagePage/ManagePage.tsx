import React, { FC } from "react";
import LinkButton from "../../../components/LinkButton/LinkButton";

const ManagePage: FC = () => {
  return (
    <>
      <header className="flex justify-between my-4">
        <p className="font-bold my-4">Manage F-Shop</p>
        <div>
          <LinkButton routeName="/logout" linkName="Logout" />
        </div>
      </header>
      <LinkButton
        routeName={"/admin/manageproducts"}
        linkName={"Manage products"}
      />
    </>
  );
};

export default ManagePage;
