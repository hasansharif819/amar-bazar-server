import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogsServices } from './blogs.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogsServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created succesfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogsServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs are retrieved succesfully',
    data: result,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogsServices.getBlogById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is retrieved succesfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogsServices.updateBlogIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is updated succesfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogsServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is deleted succesfully',
    data: result,
  });
});

export const BlogsControllers = {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlogById
};
