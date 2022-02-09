import React, { FC } from "react";
import { Link } from "react-router-dom";

const ManageProducts: FC = () => {
  return (
    <>
      <header>
        <p className="font-bold">Manage Products</p>
        <div className="mt-4">
          <Link to="/admin/createproduct">
            <span className="text-blue-600 underline">Create product</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default ManageProducts;
