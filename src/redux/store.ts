import { configureStore } from "@reduxjs/toolkit";
import sort from "./sort/sortSlice";
import cart from "./cart/cartSlice";
import pizzas from "./pizza/pizzasSlice";

export const store = configureStore({
  reducer: {
    sort,
    cart,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;
