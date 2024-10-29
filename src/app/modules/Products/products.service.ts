import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProducts } from './products.interface';
import { Products } from './products.model';
import mongoose from 'mongoose';

const createProductIntoDB = async (payload: TProducts) => {
  let payableAmount;

  if (payload.discountType === 'percent') {
    payableAmount = Math.ceil(
      payload.mrp - (payload.mrp * payload.discount) / 100,
    );
  } else if (payload.discountType === 'amount') {
    payableAmount = Math.ceil(payload.mrp - payload.discount);
  } else {
    payableAmount = payload.mrp;
  }

  const productPayload = {
    ...payload,
    payableAmount,
  };

  // console.log('productPayload = ', productPayload);

  const result = await Products.create(productPayload);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Products.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Products.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProducts>) => {
  const { ...productRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicProductInfo = await Products.findByIdAndUpdate(
      id,
      productRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicProductInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Product');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Products.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Product');
  }
};

const deleteProductFromDB = async (id: string) => {
  const result = await Products.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const ProductsServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
