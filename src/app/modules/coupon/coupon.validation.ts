import { z } from "zod";

const createCouponValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    discountPercentage: z.number(),
    quantity: z.number(),
    expiredAt: z.string()

  }),
});

// const updateCourseValidationSchema = z.object({});

export const CouponValidations = {
  createCouponValidationSchema,
  // updateCourseValidationSchema,
};

// name: string;
// slug: string;
// description: string;
// images: string[];
// createdBy:Types.ObjectId;
// discountPercentage  : number
// quantity : number;
// isDeleted : boolean;
// expiredAt: Date;