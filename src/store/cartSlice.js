import { createSlice } from "@reduxjs/toolkit";

const pizzasSize = [26, 30, 40];

const isIncludesSize = (action, currentItem) => {
  currentItem.size.includes(...action.payload.size)
    ? alert(
        `Добавлена еще одна пицца с диаметром ${
          pizzasSize[action.payload.size]
        } см.`
      )
    : currentItem.size.push(...action.payload.size);
};

const isIncludesType = (action, currentItem) => {
  if (!currentItem.type.includes(...action.payload.type)) {
    currentItem.type.push(...action.payload.type);
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    items: [],
    totalItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const itemsId = state.items.map((obj) => obj.id);
      if (itemsId.includes(action.payload.id)) {
        const currentItem = state.items.find(
          (obj) => obj.id === action.payload.id
        );
        currentItem.count = currentItem.count + 1;
        isIncludesSize(action, currentItem);
        isIncludesType(action, currentItem);
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
      state.totalItems += 1;
    },
    removeItem: (state, action) => {
      const removeObj = state.items.find((obj) => obj.id === action.payload);
      state.totalPrice -= removeObj.price * removeObj.count;
      state.totalItems -= removeObj.count;
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
    changeCount: (state, action) => {
      const currentItem = state.items.find(
        (obj) => obj.id === action.payload.item.id
      );
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
    },
  },
});

export const cartSelector = (state) => state.cart;

export const { addItem, removeItem, clearItems, changeCount } =
  cartSlice.actions;

export default cartSlice.reducer;
