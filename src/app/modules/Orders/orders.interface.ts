import { Date } from 'mongoose';
import { TUser } from '../User/user.interface';
import { TProducts } from '../Products/products.interface';

export type TOrders = {
  orderedBy?: TUser;
  totalPrice?: number;
  // discountAmount: number;
  // payableAmount?: number;
  items: {
    product: TProducts;
    // price: number;
    quantity: number;
  }[];
  orderDate?: Date;
  status:
    | 'Pending'
    | 'Approved'
    | 'Processing'
    | 'On Shipping'
    | 'Delevered'
    | 'Damaged'
    | 'Return'
    | 'Cancel';
  deliveryAddress: {
    location: string;
    area: string;
    city: string;
  };
  paymentMethod: 'Cash on Delevery' | 'Mobile-Banking' | 'Online Payment';
  paymentStatus: 'Paid' | 'Pending';
  isDeleted?: boolean;
  createdAt?: Date;
};
