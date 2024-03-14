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
  },
  reducers: {
    onChangeSortType: (state, action) => {
      state.sortType = action.payload;
      state.openSort = false;
    },
    setOpenSort: (state) => {
      state.openSort = !state.openSort;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { onChangeSortType, setOpenSort, setCategoryId } =
  sortSlice.actions;

export default sortSlice.reducer;
