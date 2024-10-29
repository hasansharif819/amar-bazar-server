/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TSubCategory } from './subCategories.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { SubCategories } from './subCategories.model';

const createSubCategoryIntoDB = async (payload: TSubCategory) => {
  const result = await SubCategories.create(payload);
  return result;
};

const getAllSubCategoriesFromDB = async () => {
  const result = await SubCategories.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  return result;
};

const updateSubCategoriesIntoDB = async (
  id: string,
  payload: Partial<TSubCategory>,
) => {
  const { ...subCategoriesRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicSubCategoriesInfo = await SubCategories.findByIdAndUpdate(
      id,
      subCategoriesRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicSubCategoriesInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update Sub Category',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await SubCategories.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Sub Category');
  }
};

const deleteSubCategoriesFromDB = async (id: string) => {
  const result = await SubCategories.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const SubCategoriesServices = {
  getAllSubCategoriesFromDB,
  createSubCategoryIntoDB,
  updateSubCategoriesIntoDB,
  deleteSubCategoriesFromDB,
};
