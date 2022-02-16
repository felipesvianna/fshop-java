import { CartProps, ProductProps } from "../interfaces";
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART } from "../actionTypes";

type AddItemActionProps = {
  type: "ADD_ITEM";
  payload: ProductProps;
};

type RemoveItemActionProps = {
  type: "REMOVE_ITEM";
  payload: number;
};

type ClearCartActionProps = {
  type: "CLEAR_CART";
};

type ActionProps =
  | AddItemActionProps
  | RemoveItemActionProps
  | ClearCartActionProps;

export default function cartReducer(state: CartProps, action: ActionProps) {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, itemsList: [action.payload, ...state.itemsList] };
    case REMOVE_ITEM:
      return {
        ...state,
        itemsList: state.itemsList.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return { ...state, itemsList: [] };
    default:
      return state;
  }
}
