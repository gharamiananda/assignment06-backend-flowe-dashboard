import { Types } from "mongoose";

export type TCoupon = {
  name: string;
  slug: string;
  description: string;
  images: string[];
  createdBy:Types.ObjectId;
discountPercentage  : number
quantity : number;
isDeleted : boolean;
expiredAt: Date;

};
