import { z } from 'zod';

export const createOrderValidationSchema = z.object({
  body: z.object({
    // orderedBy: z.string().nonempty('Ordered by (user ID) is required'),
    // totalPrice: z.number().positive('Total price must be a positive number'),
    // discountAmount: z.number().min(0, 'Discount amount cannot be negative'),
    items: z
      .array(
        z.object({
          product: z.string().nonempty('Product ID is required'),
          // price: z.number().positive('Price must be a positive number'),
          quantity: z
            .number()
            .int()
            .positive('Quantity must be a positive integer'),
        }),
      )
      .nonempty('Items array cannot be empty'),
    orderDate: z.date().default(new Date()),
    status: z
      .enum([
        'Pending',
        'Approved',
        'Processing',
        'On Shipping',
        'Delevered',
        'Damaged',
        'Return',
        'Cancel',
      ])
      .default('Pending'),
    deliveryAddress: z.object({
      location: z.string().nonempty('Location is required'),
      area: z.string().nonempty('Area is required'),
      city: z.string().nonempty('City is required'),
    }),
    paymentMethod: z.enum([
      'Cash on Delivery',
      'Mobile-Banking',
      'Online Payment',
    ]),
    paymentStatus: z.enum(['Paid', 'Pending']).default('Pending'),
    createdAt: z.date().default(new Date()),
  }),
});

export const updateOrderValidationSchema = z.object({
  body: z.object({
    totalPrice: z.number().positive().optional(),
    discountAmount: z
      .number()
      .min(0, 'Discount amount cannot be negative')
      .optional(),
    items: z
      .array(
        z.object({
          product: z.string().optional(),
          // price: z
          //   .number()
          //   .positive('Price must be a positive number')
          //   .optional(),
          quantity: z
            .number()
            .int()
            .positive('Quantity must be a positive integer')
            .optional(),
        }),
      )
      .optional(),
    orderDate: z.date().optional().default(new Date()),
    status: z
      .enum([
        'Pending',
        'Approved',
        'Processing',
        'On Shipping',
        'Delevered',
        'Damaged',
        'Return',
        'Cancel',
      ])
      .optional(),
    deliveryAddress: z.object({
      location: z.string().optional(),
      area: z.string().optional(),
      city: z.string().optional(),
    }),
    paymentMethod: z
      .enum(['Cash on Delivery', 'Mobile-Banking', 'Online Payment'])
      .optional(),
    paymentStatus: z.enum(['Paid', 'Pending']).optional(),
  }),
});

export const orderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
