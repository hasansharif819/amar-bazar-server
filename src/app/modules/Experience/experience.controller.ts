import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExperienceServices } from './experience.service';

const createExperience = catchAsync(async (req, res) => {
  const result = await ExperienceServices.createExperienceIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is created succesfully',
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req, res) => {
  const result = await ExperienceServices.getAllExperienceFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experiences are retrieved succesfully',
    data: result,
  });
});

const updateExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.updateExperienceIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is updated succesfully',
    data: result,
  });
});

const deleteExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExperienceServices.deleteExperienceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Experience is deleted succesfully',
    data: result,
  });
});

export const ExperienceControllers = {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience
};
