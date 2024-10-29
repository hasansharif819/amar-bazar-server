import { Schema, model } from 'mongoose';
import { TSubCategory } from './subCategories.interface';

const subCategorySchema = new Schema<TSubCategory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    img: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category is required'],
      ref: 'Categories',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const SubCategories = model<TSubCategory>(
  'SubCategories',
  subCategorySchema,
);
