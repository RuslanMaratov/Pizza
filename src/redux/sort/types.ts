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

export type SetFiltersType = {
  category: string;
  sortProperty: SortPropertyEnum;
  order: "asc" | "desc";
  sort: SortType;
};

export interface SortSliceState {
  sortType: SortType;
  openSort: boolean;
  categoryId: number;
  searchValue: string;
}

export interface SortProps {
  value: SortType;
}
