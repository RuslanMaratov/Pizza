import { configureStore } from "@reduxjs/toolkit";
import sort from "./sortSlice";
import cart from "./cartSlice";
import pizzas from "./pizzasSlice";

export default configureStore({
  reducer: {
    sort,
    cart,
    pizzas,
  },
});
