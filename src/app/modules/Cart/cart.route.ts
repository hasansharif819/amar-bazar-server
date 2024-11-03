import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CartControllers } from './cart.controller';
import { cartValidations } from './cart.validation';

const router = express.Router();

router.post(
  '/create-cart',
  // validateRequest(cartValidations.createCartValidationSchema),
  CartControllers.createCart,
);

router.patch(
  '/:id',
  validateRequest(cartValidations.updateCartValidationSchema),
  CartControllers.updateCart,
);

router.get('/', CartControllers.getMyCart);

export const CartRoutes = router;
