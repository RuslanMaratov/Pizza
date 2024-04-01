import { configureStore } from "@reduxjs/toolkit";
import sort from "./sortSlice";
import cart from "./cartSlice";
import pizzas from "./pizzasSlice";

export const store = configureStore({
  reducer: {
    sort,
    cart,
    pizzas,
  },
});

export type RootState = ReturnType<typeof store.getState>;
