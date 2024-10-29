import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    featuredImg: z.string(),
    category: z.string(),
    subCategory: z.string(),
    brand: z.string(),
    mrp: z.number(),
    discountType: z.enum(['amount', 'percent']),
    discount: z.number(),
    imgs: z.array(z.string()),
    description: z.string(),
    productType: z.enum(['litter', 'kg', 'piece']),
    stock: z.number(),
    isTopProduct: z.boolean().optional().default(false),
    isFeatured: z.boolean().optional().default(false),
    isNewProduct: z.boolean().optional().default(false),
    publishedStatus: z.enum(['published', 'draft']),
    publishedAt: z.date().optional(),
    isAvailable: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    featuredImg: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    brand: z.string().optional(),
    mrp: z.number().positive().optional(),
    discountType: z.enum(['amount', 'percent']).optional(),
    discount: z.number().positive().optional(),
    imgs: z.array(z.string()).optional(),
    description: z.string().optional(),
    productType: z.enum(['litter', 'kg', 'piece']).optional(),
    stock: z.number().int().positive().optional(),
    isTopProduct: z.boolean().optional().default(false),
    isFeatured: z.boolean().optional().default(false),
    isNewProduct: z.boolean().optional().default(false),
    publishedStatus: z.enum(['published', 'draft']).optional(),
    publishedAt: z.date().optional(),
    isAvailable: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const ProductsValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
