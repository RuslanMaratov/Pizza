import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  PizzaItemType,
  PizzaParamsType,
  PizzasSliceType,
  PizzasStatusEnum,
} from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItemType[], PizzaParamsType>(
  "user/fetchPizzasStatus",
  async (params) => {
    const { categoryId, sortType, search } = params;
    const { data } = await axios.get<PizzaItemType[]>(
      `https://65e58df6d7f0758a76e6aaad.mockapi.io/items?category=${
        categoryId === 0 ? "" : categoryId
      }&sortBy=${sortType.sortProperty}&order=${sortType.order}${search}
          `
    );
    return data;
  }
);

const initialState: PizzasSliceType = {
  item: [],
  status: PizzasStatusEnum.LOADING, //loading|error|success
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItem: (state, action: PayloadAction<PizzaItemType[]>) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = PizzasStatusEnum.LOADING;
      state.item = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItemType[]>) => {
        state.item = action.payload;
        state.status = PizzasStatusEnum.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = PizzasStatusEnum.ERROR;
      state.item = [];
    });
  },
});

export default pizzasSlice.reducer;
