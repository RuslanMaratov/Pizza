import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    sortType: {
      name: "популярности",
      sortProperty: "rating",
      id: 0,
      order: "asc",
    },
    openSort: false,
    categoryId: 0,
    searchValue: "",
  },
  reducers: {
    onChangeSortType: (state, action) => {
      state.sortType = action.payload;
      state.openSort = false;
    },
    setOpenSort: (state, action) => {
      if (action.payload === undefined) {
        state.openSort = !state.openSort;
      } else {
        state.openSort = action.payload;
      }
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.category);
      state.sortType = action.payload.sort;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const sortSelector = (state) => state.sort;

export const {
  onChangeSortType,
  setOpenSort,
  setCategoryId,
  setFilters,
  setSearchValue,
} = sortSlice.actions;

export default sortSlice.reducer;
