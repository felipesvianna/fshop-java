import React, { FC } from "react";
import { Link } from "react-router-dom";
import { CategoryProps } from "../../interfaces";

const Category: FC<CategoryProps> = (categoryData) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 whitespace-nowrap">{categoryData.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link to={"/admin/editcategory/" + categoryData.id}>
          <button
            className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            type="submit"
          >
            Edit
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default Category;
