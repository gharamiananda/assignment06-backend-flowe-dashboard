import { JwtPayload } from "jsonwebtoken";

import QueryBuilder from "../../builder/QueryBuilder";
import { TCoupon } from "./coupon.interface";
import { Coupon } from "./coupon.model";

const createCouponIntoDB = async (userData:JwtPayload,payload: TCoupon) => {
const slugName=payload.name.toLowerCase().split(' ').join('-');

  const result = await Coupon.create({...payload,createdBy:userData._id,slug:slugName});

  return result;
};


const getAllCouponFromDB = async (query: Record<string, unknown>) => {


  
  const productQuery = new QueryBuilder(
    Coupon.find({isDeleted:false}),
    query,
  )
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleCouponFromDB = async (slug: string) => {
  const result = await Coupon.findOne({slug});

  return result;
};


const deleteCouponsIntoDB = async (couponSlugs: string[]) => {
  const result = await Coupon.updateMany({
    slug:
        {
            $in:couponSlugs
                
        }
},
{
   $set: { isDeleted: true} 


},
{upsert: true,multi: true }
  );

  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponFromDB,
  getSingleCouponFromDB,
  deleteCouponsIntoDB
};
