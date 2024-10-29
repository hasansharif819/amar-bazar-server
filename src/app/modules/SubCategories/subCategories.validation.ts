import { z } from 'zod';

export const createSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    img: z.string(),
  }),
});

export const updateSubCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    img: z.string().optional(),
  }),
});

export const SubCategoryValidations = {
  createSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
};
