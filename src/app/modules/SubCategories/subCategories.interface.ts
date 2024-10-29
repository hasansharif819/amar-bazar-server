import { Date } from 'mongoose';
import { TCategory } from '../Categories/categories.interface';

export type TSubCategory = {
  name: string;
  img: string;
  category: TCategory;
  isDeleted: boolean;
  createdAt?: Date;
};
