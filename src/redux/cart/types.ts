export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: number[];
  size: number[];
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalItems: number;
}

export type CartItemProps = {
  id: string;
  title: string;
  type: number[];
  size: number[];
  count: number;
  price: number;
  imageUrl: string;
};
