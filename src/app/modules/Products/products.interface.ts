import { Date } from 'mongoose';
import { TCategory } from '../Categories/categories.interface';
import { TSubCategory } from '../SubCategories/subCategories.interface';

export type TProducts = {
  title: string;
  featuredImg: string;
  category: TCategory;
  subCategory: TSubCategory;
  brand: string;
  mrp: number;
  discountType: 'amount' | 'percent';
  discount: number;
  payableAmount?: number;
  imgs: string[];
  description: string;
  productType: 'litter' | 'kg' | 'piece';
  stock: number;
  isTopProduct?: boolean;
  isFeatured?: boolean;
  isNewProduct?: boolean;
  publishedStatus: 'published' | 'draft';
  publishedAt: Date;
  isAvailable?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
};
