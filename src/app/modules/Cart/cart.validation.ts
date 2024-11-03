import { z } from 'zod';

export const createCartValidationSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product: z.string(),
        quantity: z.number().default(1),
      }),
    ),
  }),
});

export const updateCartValidationSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product: z.string().optional(),
        quantity: z.number().default(1),
      }),
    ),
  }),
});

export const cartValidations = {
  createCartValidationSchema,
  updateCartValidationSchema,
};
