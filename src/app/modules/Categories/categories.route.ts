import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './categories.controller';
import { categoriesValidations } from './categories.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-category',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(categoriesValidations.createCategoriesValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(categoriesValidations.updateCategoriesValidationSchema),
  CategoryControllers.updateCategory,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CategoryControllers.deleteCategory,
);

export const CategoriesRoutes = router;
