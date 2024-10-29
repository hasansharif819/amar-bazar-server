import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductsControllers } from './products.controller';
import { ProductsValidations } from './products.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductsValidations.createProductValidationSchema),
  ProductsControllers.createProduct,
);

router.get('/', ProductsControllers.getAllProducts);

router.get('/:id', ProductsControllers.getSingleProduct);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(ProductsValidations.updateProductValidationSchema),
  ProductsControllers.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductsControllers.deleteProduct,
);

export const ProductsRoutes = router;
