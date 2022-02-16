import React, { FC } from "react";
import { Link } from "react-router-dom";
import { CartProps } from "../../interfaces";

const Cart: FC<CartProps> = ({ itemsList }) => {
  return (
    <table id="cart-list" className="table-auto divide-y divide-gray-300">
      <tbody>
        {itemsList.map((item, index) => {
          return (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.details}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={"/cart/" + item.id}>
                  <button
                    className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                    type="submit"
                  >
                    Remove
                  </button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Cart;
