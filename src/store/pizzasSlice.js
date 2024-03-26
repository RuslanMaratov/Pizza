import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "user/fetchPizzasStatus",
  async (params) => {
    const { categoryId, sortType, search } = params;
    const { data } = await axios.get(
      `https://65e58df6d7f0758a76e6aaad.mockapi.io/items?category=${
        categoryId === 0 ? "" : categoryId
      }&sortBy=${sortType.sortProperty}&order=${sortType.order}${search}
          `
    );
    return data;
  }
);

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState: {
    item: [],
    status: "loading", //loading|error|success
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.item = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.item = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.item = [];
    });
  },
});

export const pizzasSelector = (state) => state.pizzas;

// export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
