import { z } from 'zod';

export const createBlogsValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    email: z.string(),
    description: z.string(),
    img: z.string(),
  }),
});

export const updateBlogsValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    email: z.string().optional(),
    description: z.string().optional(),
    img: z.string().optional(),
  }),
});

export const blogsValidations = {
  createBlogsValidationSchema,
  updateBlogsValidationSchema
};
