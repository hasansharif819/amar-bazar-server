/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TOrders } from './orders.interface';
import { Orders } from './orders.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Products } from '../Products/products.model';
import { User } from '../User/user.model';

const createOrderIntoDB = async (user: any, payload: TOrders) => {
  const userEmail = user.email;
  const currentUser = await User.findOne({ email: userEmail });
  if (!currentUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const orderedBy = currentUser._id;

  const productIds = payload.items.map((item) => item.product);

  const products = await Products.find({ _id: { $in: productIds } });
  if (products.length !== productIds.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'One or more products not found');
  }

  const price = payload.items.reduce((total, item) => {
    const product = products.find(
      (p) => p._id.toString() === item.product.toString(),
    );

    if (!product || product.payableAmount == null) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Product not found or payable amount is missing',
      );
    }

    return total + item.quantity * product.payableAmount;
  }, 0);

  const totalPrice = Math.floor(price);

  const orderPayload = {
    ...payload,
    orderedBy,
    totalPrice,
  };

  const result = await Orders.create(orderPayload);
  return result;
};

const getAllOrdersFromDBForAdmin = async () => {
  const result = await Orders.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const getOrderByIdFromDBForAdmin = async (id: string) => {
  const result = await Orders.findOne({ _id: id, isDeleted: false });
  return result;
};

const getAllOfMyOrdersFromDB = async (user: any) => {
  const userEmail = user.email;
  if (!userEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Orders.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const getSingleOfMyOrdersFromDBUsingId = async (user: any, id: string) => {
  const userEmail = user.email;
  if (!userEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Orders.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateOrderIntoDB = async (
  user: any,
  id: string,
  payload: Partial<TOrders>,
) => {
  const userEmail = user.email;
  if (!userEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { ...orderRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicOrderInfo = await Orders.findByIdAndUpdate(
      id,
      orderRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicOrderInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Order');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Orders.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Order');
  }
};

const deleteOrderFromDB = async (user: any, id: string) => {
  const userEmail = user.email;
  if (!userEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Orders.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const OrdersServices = {
  getAllOrdersFromDBForAdmin,
  getOrderByIdFromDBForAdmin,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
  getAllOfMyOrdersFromDB,
  getSingleOfMyOrdersFromDBUsingId,
};
