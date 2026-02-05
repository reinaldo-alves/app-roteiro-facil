export type IAttraction = {
  id: number;
  name: string;
  description: string;
  city: string;
  area: string;
  price: number;
  images: string;
  category: string;
  score: number;
};

export type IUser = {
  id: number;
  name: string;
  email: string;
  reviews: Array<number>;
};
