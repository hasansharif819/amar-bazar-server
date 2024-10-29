import { Schema, model } from 'mongoose';
import { TProducts } from './products.interface';

const productSchema = new Schema<TProducts>({
  title: { type: String, unique: true, required: true },
  featuredImg: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    enum: ['amount', 'percent'],
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  payableAmount: {
    type: Number,
  },
  imgs: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    enum: ['litter', 'kg', 'piece'],
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  isTopProduct: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isNewProduct: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  publishedStatus: {
    type: String,
    enum: ['published', 'draft'],
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Products = model<TProducts>('Products', productSchema);
