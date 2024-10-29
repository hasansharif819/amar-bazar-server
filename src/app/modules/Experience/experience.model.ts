import { Schema, model } from 'mongoose';
import { TExperience } from './experience.interface';

const experienceSchema = new Schema<TExperience>(
  {
    companyName: {
      type: String,
      required: [true, 'Company Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    website: {
      type: String,
      required: [true, 'website is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    logo: { type: String, default: '' },
    joining: {
      type: String,
      required: [true, 'Joining Month and year is required'],
    },
    ending: {
      type: String,
      required: [true, 'Ending month and year is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

export const Experience = model<TExperience>('Experience', experienceSchema);
