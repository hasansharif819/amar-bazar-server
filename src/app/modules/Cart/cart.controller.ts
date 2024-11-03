import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.service';

const createCart = catchAsync(async (req, res) => {
  const result = await CartServices.addProductIntoCart(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is added succesfully into Cart',
    data: result,
  });
});

const getMyCart = catchAsync(async (req, res) => {
  const result = await CartServices.getMyCartFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart are retrieved succesfully',
    data: result,
  });
});

const updateCart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.updateCartIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart is updated succesfully',
    data: result,
  });
});

export const CartControllers = {
  createCart,
  getMyCart,
  updateCart,
};
