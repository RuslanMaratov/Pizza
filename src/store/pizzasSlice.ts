import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SortType } from "./sortSlice";
import { RootState } from "./store";

export enum PizzasStatusEnum {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
}

export type PizzaItemType = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: number[];
  size: number[];
  category: number;
  rating: number;
  count: number;
};

interface PizzasSliceType {
  item: PizzaItemType[];
  status: PizzasStatusEnum;
}

type PizzaParamsType = {
  categoryId: number;
  sortType: SortType;
  search: string;
};

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

export const pizzasSelector = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
