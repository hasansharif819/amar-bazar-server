/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TExperience } from './experience.interface';
import { Experience } from './experience.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createExperienceIntoDB = async (payload: TExperience) => {
  const result = await Experience.create(payload);
  return result;
};

const getAllExperienceFromDB = async () => {
  const result = await Experience.find({ isDeleted: false }).sort({ createdAt: -1 });
  return result;
};

const updateExperienceIntoDB = async (id: string, payload: Partial<TExperience>) => {
  const { ...experienceRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedBasicExperienceInfo = await Experience.findByIdAndUpdate(
      id,
      experienceRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicExperienceInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Experience');
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Experience.findById(id);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Experience');
  }
};

const deleteExperienceFromDB = async (id: string) => {
  const result = await Experience.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const ExperienceServices = {
  getAllExperienceFromDB,
  createExperienceIntoDB,
  updateExperienceIntoDB,
  deleteExperienceFromDB
};
