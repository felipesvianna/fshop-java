import React from "react";
import { CartProps } from "../../interfaces";

// cartContext
export default React.createContext<CartProps>({ itemsList: [] });
