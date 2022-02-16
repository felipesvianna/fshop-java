import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART } from "../actionTypes";
import cartReducer from "./cartReducer";

describe("Cart Reducer tests", () => {
  const stateEmptyListMock = {
    itemsList: [],
  };

  const stateListMock = {
    itemsList: [
      {
        id: 1,
        name: "Monitor",
        details: '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
        category: "Computers",
        quantity: 5,
        price: 2000.99,
      },
      {
        id: 2,
        name: "Headphones",
        details:
          "Unlike other brands that are heavy, bulky and cause fatigue, our ergonomic design optimizes comfort",
        category: "Eletronics",
        quantity: 10,
        price: 499.99,
      },
      {
        id: 3,
        name: "Shelf",
        details:
          "Two-tiered shelving unit system with modular, stackable design",
        category: "Home & Kitchen",
        quantity: 2,
        price: 120.99,
      },
    ],
  };

  it("should remove all products from the itemsList on CLEAR_CART action type", () => {
    const newState = cartReducer(stateListMock, {
      type: CLEAR_CART,
    });
    expect(newState).toStrictEqual(stateEmptyListMock);
  });

  it("should remove a product from the itemsList on REMOVE_ITEM action type", () => {
    const expectedState = {
      itemsList: [
        {
          id: 1,
          name: "Monitor",
          details:
            '32" Class QHD (2560 x 1440) IPS Display (31.5" Screen Size)',
          category: "Computers",
          quantity: 5,
          price: 2000.99,
        },
        {
          id: 3,
          name: "Shelf",
          details:
            "Two-tiered shelving unit system with modular, stackable design",
          category: "Home & Kitchen",
          quantity: 2,
          price: 120.99,
        },
      ],
    };
    const newState = cartReducer(stateListMock, {
      type: REMOVE_ITEM,
      payload: 2,
    });
    expect(newState).toStrictEqual(expectedState);
  });

  it("should add a product in the itemsList on ADD_ITEM action type", () => {
    const productInstance = {
      id: 1,
      name: "new product",
      details: "another new product at the store",
      category: "Category 2",
      quantity: 0,
      price: 5.99,
    };

    const expectedState = {
      itemsList: [productInstance],
    };

    const newState = cartReducer(stateEmptyListMock, {
      type: ADD_ITEM,
      payload: productInstance,
    });
    expect(newState).toStrictEqual(expectedState);
  });
});
