import { Schema, model } from 'mongoose';
import { TBlogs } from './blogs.interface';

const blogsSchema = new Schema<TBlogs>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    img: { type: String, 
    required: [true, 'Image is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Blogs = model<TBlogs>('Blogs', blogsSchema);
