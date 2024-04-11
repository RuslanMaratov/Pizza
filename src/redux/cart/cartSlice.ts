import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getCartFromLS from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const pizzasSize = [26, 30, 40];

const isIncludesSize = (
  action: PayloadAction<CartItem>,
  currentItem: CartItem
) => {
  currentItem.size.some((size) => action.payload.size.includes(size))
    ? alert(
        `Добавлена еще одна пицца с диаметром ${
          pizzasSize[action.payload.size[0]]
        } см.`
      )
    : currentItem.size.push(...action.payload.size);
};

const isIncludesType = (
  action: PayloadAction<CartItem>,
  currentItem: CartItem
) => {
  if (!currentItem.type.some((type) => action.payload.type.includes(type))) {
    currentItem.type.push(...action.payload.type);
  }
};

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: cartData.reduce((sum: number, obj: CartItem) => {
    return sum + obj.price * obj.count;
  }, 0),
  items: cartData,
  totalItems: cartData.reduce((sum: number, obj: CartItem) => {
    return sum + obj.count;
  }, 0),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemsId = state.items.map((obj: CartItem) => obj.id);
      if (itemsId.includes(action.payload.id)) {
        const currentItem = state.items.find(
          (obj) => obj.id === action.payload.id
        );
        if (currentItem) {
          currentItem.count = currentItem.count + 1;
          isIncludesSize(action, currentItem);
          isIncludesType(action, currentItem);
        }
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
      state.totalItems += 1;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const removeObj = state.items.find((obj) => obj.id === action.payload);
      if (removeObj) {
        state.totalPrice -= removeObj.price * removeObj.count;
        state.totalItems -= removeObj.count;
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
    changeCount: (
      state,
      action: PayloadAction<{ type: string; item: CartItem }>
    ) => {
      const currentItem = state.items.find(
        (obj) => obj.id === action.payload.item.id
      );
      if (currentItem) {
        switch (action.payload.type) {
          case "plus":
            currentItem.count += 1;
            state.totalItems += 1;
            state.totalPrice += currentItem.price;
            break;

          case "minus":
            currentItem.count -= 1;
            state.totalItems -= 1;
            state.totalPrice -= currentItem.price;
            break;

          default:
            break;
        }

        if (currentItem.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== currentItem.id);
        }
      }
    },
  },
});

export const { addItem, removeItem, clearItems, changeCount } =
  cartSlice.actions;

export default cartSlice.reducer;
