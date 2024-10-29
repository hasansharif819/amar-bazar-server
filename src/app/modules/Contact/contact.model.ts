import { Schema, model } from 'mongoose';
import { TContact } from './contact.interface';

const contactSchema = new Schema<TContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Contacts = model<TContact>('Contacts', contactSchema);
