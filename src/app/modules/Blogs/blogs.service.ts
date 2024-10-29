/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBlogs } from './blogs.interface';
import { Blogs } from './blogs.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createBlogIntoDB = async (payload: TBlogs) => {
  const result = await Blogs.create(payload);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blogs.find({ isDeleted: false }).sort({ createdAt: -1 });
  return result;
};

const getBlogById = async (id: string) => {
  const result = await Blogs.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlogs>) => {
  // console.log('update Blog', id, payload);

  const { ...blogRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicBlogInfo = await Blogs.findByIdAndUpdate(
      id,
      blogRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicBlogInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Blog');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Blogs.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog');
  }
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blogs.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const BlogsServices = {
  getAllBlogsFromDB,
  deleteBlogFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  getBlogById
};
