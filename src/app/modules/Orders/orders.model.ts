import mongoose, { Schema, model } from 'mongoose';
import { TOrders } from './orders.interface';

const ordersSchema = new Schema<TOrders>(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    totalPrice: {
      type: Number,
      required: false,
    },
    // discountAmount: {
    //   type: Number,
    //   required: true,
    // },
    // payableAmount: {
    //   type: Number,
    //   required: false,
    // },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
        // price: {
        //   type: Number,
        //   required: true,
        // },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Approved',
        'Processing',
        'On Shipping',
        'Delevered',
        'Damaged',
        'Return',
        'Cancel',
      ],
      required: true,
    },
    deliveryAddress: {
      location: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'Mobile-Banking', 'Online Payment'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending'],
      required: true,
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

export const Orders = model<TOrders>('Orders', ordersSchema);
