import { Schema, model } from "mongoose";
import { TCoupon } from "./coupon.interface";

const couponSchema = new Schema<TCoupon>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
   description: {
    type: String
  }, 
  images:  [String]
  ,
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,

  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },isDeleted: {
    type: Boolean,
    default: false,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
},{
  timestamps: true,

});

export const Coupon = model<TCoupon>("Coupon", couponSchema);


