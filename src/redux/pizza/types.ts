import { SortType } from "../sort/types";

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
  type?: number[];
  size?: number[];
  category: number;
  rating: number;
  count: number;
};

export interface PizzasSliceType {
  item: PizzaItemType[];
  status: PizzasStatusEnum;
}

export type PizzaParamsType = {
  categoryId: number;
  sortType: SortType;
  search: string;
};

export type PizzaBlockProps = {
  id: string;
  title: string;
  imageUrl: string;
  types?: number[];
  sizes?: number[];
  price: number;
  count: number;
};
