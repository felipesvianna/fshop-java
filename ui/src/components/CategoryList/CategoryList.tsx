import React, { FC } from "react";
import Category, { CategoryProps } from "../Category/Category";

interface CategoryListProps {
  listOfCategories?: CategoryProps[];
}
const CategoryList: FC<CategoryListProps> = ({
  listOfCategories = [],
}: CategoryListProps) => {
  if (Array.isArray(listOfCategories) && !listOfCategories.length) {
    return <p>There is no categories.</p>;
  }

  return (
    <table id="categories-list" className="table-auto divide-y divide-gray-300">
      <thead className="border-b bg-gray-50">
        <tr>
          <th className="text-sm font-medium text-gray-900 px-6 py-4">Name</th>
        </tr>
      </thead>
      <tbody>
        {listOfCategories.map((category, index) => {
          return <Category key={index} {...category} />;
        })}
      </tbody>
    </table>
  );
};

export default CategoryList;
