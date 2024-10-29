import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogsControllers } from './blogs.controller';
import { blogsValidations } from './blogs.validation';

const router = express.Router();

router.post(
  '/create-blog',
  validateRequest(blogsValidations.createBlogsValidationSchema),
  BlogsControllers.createBlog,
);

router.patch(
  '/:id',
  validateRequest(blogsValidations.updateBlogsValidationSchema),
  BlogsControllers.updateBlog,
);

router.get(
  '/',
  BlogsControllers.getAllBlogs,
);

router.get(
  '/:id',
  BlogsControllers.getBlogById,
)

router.delete(
  '/:id',
  BlogsControllers.deleteBlog,
);

export const BlogsRoutes = router;
