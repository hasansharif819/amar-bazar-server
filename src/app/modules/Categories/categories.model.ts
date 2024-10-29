import { Schema, model } from 'mongoose';
import { TCategory } from './categories.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    img: {
      type: String,
      required: [true, 'Image is required'],
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

export const Categories = model<TCategory>('Skills', categorySchema);
