/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TCategory } from './categories.interface';
import { Categories } from './categories.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Categories.create(payload);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await Categories.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const { ...categoryRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicCategoryInfo = await Categories.findByIdAndUpdate(
      id,
      categoryRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCategoryInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Category');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Categories.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Category');
  }
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await Categories.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CategoryServices = {
  getAllCategoriesFromDB,
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
