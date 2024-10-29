import { z } from 'zod';

export const createExperienceValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    companyName: z.string(),
    address:z.string(),
    website:z.string(),
    description: z.string(),
    logo: z.string().optional(),
    joining: z.string(),
    ending: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

export const updateExperienceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    companyName: z.string().optional(),
    address:z.string().optional(),
    website:z.string().optional(),
    description: z.string().optional(),
    logo: z.string().optional(),
    joining: z.string().optional(),
    ending: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const experienceValidations = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema
};
