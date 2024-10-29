import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.service';

const createContact = catchAsync(async (req, res) => {
  const result = await ContactServices.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact added succesfully',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContactsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contacts are retrieved succesfully',
    data: result,
  });
});

export const ContactControllers = {
  createContact,
  getAllContacts,
};
