import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactControllers } from './contact.controller';
import { contactValidations } from './contact.validation';

const router = express.Router();

router.post(
  '/create-contact',
  validateRequest(contactValidations.createContactValidationSchema),
  ContactControllers.createContact,
);

router.get(
  '/',
  ContactControllers.getAllContacts,
);

export const ContactRoutes = router;
