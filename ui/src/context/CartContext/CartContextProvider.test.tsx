import { render, screen } from "@testing-library/react";
import { FC } from "react";
import CartContext from ".";
import { CartProps } from "../../interfaces";

describe("CartContextProvider tests", () => {
  const contextValues = {
    itemsList: [
      {
        id: 1,
        name: "Monitor",
        details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
        category: "Computers",
        quantity: 5,
        price: 2000.99,
      },
    ],
  };

  const ComponentMock: FC = () => {
    return (
      <CartContext.Consumer>
        {(contextValues: CartProps) => {
          return <p>{contextValues.itemsList.map((item) => item.name)}</p>;
        }}
      </CartContext.Consumer>
    );
  };

  it("should access provider values on children components", () => {
    render(
      <CartContext.Provider value={contextValues}>
        <ComponentMock />
      </CartContext.Provider>
    );
    expect(screen.getByText("Monitor")).toBeInTheDocument();
  });
});
