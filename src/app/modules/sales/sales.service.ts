import { JwtPayload } from "jsonwebtoken";
import { TSales } from "./sales.interface";
import { Sales } from "./sales.model";
import { Product } from "../product/product.model";
import { TProduct } from "../product/product.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { User } from "../user/user.model";

const createSalesIntoDB = async (userData:JwtPayload,payload: TSales) => {

  const findProduct:TProduct|null= await Product.findById(payload.product);
  if(!findProduct){
    throw new AppError(httpStatus.NOT_FOUND,'Product Not Found','data statusCode')
  
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    
    //step1: basic product info update
    const updatedProductInfo = await Product.findOneAndUpdate(
      {slug: findProduct.slug},
      { $inc: { quantity: - payload.soldQuantity } },
      {
        new: true,
        runValidators: true,
        session,
      },
      );
      
    if (!updatedProductInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Product');
    }

    const rewardPrice=payload.rewardsPrice > 0 ?  payload.rewardsPrice  : 0


    const updatedUserInfo = await User.findOneAndUpdate(
      {_id: userData?._id},
      { $inc: { rewardPoints:  payload.totalPrice - rewardPrice } },
      {
        new: true,
        runValidators: true,
        session,
      },
      );
      
    if (!updatedUserInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update User');
    }
    

// console.log('updatedProductInfo', updatedProductInfo)

    const createSales = await Sales.create(
      {...payload,totalPrice:payload.soldQuantity*findProduct.price,salesMan:userData?._id}
     
    );

    if (!createSales) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Sales');
    }


    await session.commitTransaction();
    await session.endSession();

    return {updatedProductInfo}

  } catch (error) {
    console.log('errosalesr', error)
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Sales');
  }

};

const getAllSalesFromDB = async (query: Record<string, unknown>,userData:JwtPayload) => {



  const salesQuery = new QueryBuilder(
    Sales.find({salesMan:userData?._id})
      .populate('product'),
    query,
  )
    .search(['nameOfBuyer'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await salesQuery.countTotal();
  const result = await salesQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleSalesFromDB = async (id: string) => {
  const result = await Sales.findById(id);

  return result;
};

const deleteSalesIntoDB = async (id: string) => {
  const result = await Sales.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true }
  );

  return result;
};

const updateSalesIntoDB = async (
  id: string,
  payload: Partial<TSales>
) => {
  const result = await Sales.findByIdAndUpdate(id, payload);

  return result;
};
export const SalesServices = {
  createSalesIntoDB,
  getAllSalesFromDB,
  getSingleSalesFromDB,
  deleteSalesIntoDB,
  updateSalesIntoDB,
};
