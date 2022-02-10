import React, { FC } from "react";
export interface CategoryProps {
  name: string;
}
const Category: FC<CategoryProps> = (categoryData) => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 whitespace-nowrap">{categoryData.name}</td>
    </tr>
  );
};

export default Category;
