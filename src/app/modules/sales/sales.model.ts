import { Schema, model } from "mongoose";
import { TSales } from "./sales.interface";

const salesSchema = new Schema<TSales>({
  nameOfBuyer: {
    type: String,
    required: true,
  },soldQuantity: {
    type: Number,
    required: true,
  },
  soldDate: {
    type: Date,
    required: true,
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true

  },
  salesMan:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true

  },

  
  
    totalPrice:{
      type: Number,
      required: true,
    },
    couponPrice:{
      type: Number,
      default: 0

    },
    couponName:{
      type: String,
      default: ''

    },
    rewardsPrice:{
      type: Number,
      default: 0

    },
    productPrice:{
      type: Number,
      required: true,


    }
  
},{
  timestamps: true,

});

export const Sales = model<TSales>("Sales", salesSchema);

// nameOfBuyer: string
// soldQuantity : number
// date:  Date
