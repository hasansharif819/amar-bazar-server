import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SubCategoriesControllers } from './subCategories.controller';
import { SubCategoryValidations } from './subCategories.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-subcategory',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(SubCategoryValidations.createSubCategoryValidationSchema),
  SubCategoriesControllers.createSubCategory,
);

router.get('/', SubCategoriesControllers.getAllSubCategories);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(SubCategoryValidations.updateSubCategoryValidationSchema),
  SubCategoriesControllers.updateSubCategories,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SubCategoriesControllers.deleteSubCategory,
);

export const SubCategoriesRoutes = router;
