import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum SortPropertyEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}
export enum SortNameEnum {
  RATING = "популярности",
  PRICE_ASC = "цене(по возр.)",
  PRICE_DESC = "цене(по убыв.)",
  TITLE = "алфавиту",
}

export type SortType = {
  name: SortNameEnum;
  sortProperty: SortPropertyEnum;
  id: number;
  order: "asc" | "desc";
};

type SetFiltersType = {
  category: string;
  sortProperty: SortPropertyEnum;
  order: "asc" | "desc";
  sort: SortType;
};

interface SortSliceState {
  sortType: SortType;
  openSort: boolean;
  categoryId: number;
  searchValue: string;
}

const initialState: SortSliceState = {
  sortType: {
    name: SortNameEnum.RATING,
    sortProperty: SortPropertyEnum.RATING,
    id: 0,
    order: "asc",
  },
  openSort: false,
  categoryId: 0,
  searchValue: "",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    onChangeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
      state.openSort = false;
    },
    setOpenSort: (state, action: PayloadAction<false | null>) => {
      if (action.payload === null) {
        state.openSort = !state.openSort;
      } else {
        state.openSort = action.payload;
      }
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setFilters: (state, action: PayloadAction<SetFiltersType>) => {
      state.categoryId = Number(action.payload.category);
      state.sortType = action.payload.sort;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const sortSelector = (state: RootState) => state.sort;

export const {
  onChangeSortType,
  setOpenSort,
  setCategoryId,
  setFilters,
  setSearchValue,
} = sortSlice.actions;

export default sortSlice.reducer;
