import mongoose, { Schema, model } from 'mongoose';
import { TCart } from './cart.interface';

const cartSchema = new Schema<TCart>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = model<TCart>('Cart', cartSchema);
