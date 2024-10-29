import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrdersControllers } from './orders.controller';
import { orderValidations } from './orders.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(orderValidations.createOrderValidationSchema),
  OrdersControllers.createOrder,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(orderValidations.updateOrderValidationSchema),
  OrdersControllers.updateOrder,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  OrdersControllers.getAllOfMyOrders,
);

router.get(
  '/admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  OrdersControllers.getAllOrdersForAdmin,
);

router.get(
  '/:id/admin',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  OrdersControllers.getOrderByIdForAdmin,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  OrdersControllers.getOrderById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  OrdersControllers.deleteOrder,
);

export const OrdersRoutes = router;
