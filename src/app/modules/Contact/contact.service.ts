/* eslint-disable @typescript-eslint/no-explicit-any */
import { TContact } from './contact.interface';
import { Contacts } from './contact.model';

const createContactIntoDB = async (payload: TContact) => {
  const result = await Contacts.create(payload);
  return result;
};

const getAllContactsFromDB = async () => {
  const result = await Contacts.find().sort({ createdAt: -1 });
  return result;
};

export const ContactServices = {
  getAllContactsFromDB,
  createContactIntoDB,
};
