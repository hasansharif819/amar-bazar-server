import { Date } from 'mongoose';
import { TUser } from '../User/user.interface';
import { TProducts } from '../Products/products.interface';

export type TCart = {
  user: TUser;
  items: {
    product: TProducts;
    quantity?: number;
  }[];
  totalPrice?: number;
  createdAt?: Date;
};
