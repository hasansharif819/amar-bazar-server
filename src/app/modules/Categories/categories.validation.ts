import { z } from 'zod';

export const createCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    img: z.string(),
  }),
});

export const updateCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    img: z.string().optional(),
  }),
});

export const categoriesValidations = {
  createCategoriesValidationSchema,
  updateCategoriesValidationSchema,
};
