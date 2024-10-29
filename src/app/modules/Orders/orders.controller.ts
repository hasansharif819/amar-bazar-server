import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrdersServices } from './orders.service';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrdersServices.createOrderIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is created succesfully',
    data: result,
  });
});

const getAllOrdersForAdmin = catchAsync(async (req, res) => {
  const result = await OrdersServices.getAllOrdersFromDBForAdmin();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders are retrieved succesfully',
    data: result,
  });
});

const getAllOfMyOrders = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await OrdersServices.getAllOfMyOrdersFromDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders are retrieved succesfully',
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await OrdersServices.getSingleOfMyOrdersFromDBUsingId(
    user,
    id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved succesfully',
    data: result,
  });
});

const getOrderByIdForAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrdersServices.getOrderByIdFromDBForAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved succesfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await OrdersServices.updateOrderIntoDB(user, id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is updated succesfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await OrdersServices.deleteOrderFromDB(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is deleted succesfully',
    data: result,
  });
});

export const OrdersControllers = {
  createOrder,
  getAllOfMyOrders,
  getAllOrdersForAdmin,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderByIdForAdmin,
};
