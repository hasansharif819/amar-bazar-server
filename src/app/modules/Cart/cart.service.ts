/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Products } from '../Products/products.model';

const addProductIntoCart = async (payload: any) => {
  // const result = await Cart.create(payload);
  // return result;

  console.log('Payload = ', payload);

  const productId = payload.product;

  try {
    const product = await Products.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    console.log('product = ', product);
    productPrice = product?.payableAmount;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update cart');
  }
};

const getMyCartFromDB = async () => {
  const result = await Cart.find({ isDeleted: false }).sort({ createdAt: -1 });
  return result;
};

const updateCartIntoDB = async (id: string, payload: Partial<TCart>) => {
  const { ...cartRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicCartInfo = await Cart.findByIdAndUpdate(
      id,
      cartRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCartInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Cart');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Cart.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update cart');
  }
};

export const CartServices = {
  getMyCartFromDB,
  addProductIntoCart,
  updateCartIntoDB,
};
