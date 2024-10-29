import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SubCategoriesServices } from './subCategories.service';

const createSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoriesServices.createSubCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory is created succesfully',
    data: result,
  });
});

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await SubCategoriesServices.getAllSubCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategories are retrieved succesfully',
    data: result,
  });
});

const updateSubCategories = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubCategoriesServices.updateSubCategoriesIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory is updated succesfully',
    data: result,
  });
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SubCategoriesServices.deleteSubCategoriesFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategory is deleted succesfully',
    data: result,
  });
});

export const SubCategoriesControllers = {
  createSubCategory,
  getAllSubCategories,
  updateSubCategories,
  deleteSubCategory,
};
