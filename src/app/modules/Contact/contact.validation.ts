import { z } from 'zod';

export const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    message: z.string()
  }),
});

export const contactValidations = {
  createContactValidationSchema,
};
