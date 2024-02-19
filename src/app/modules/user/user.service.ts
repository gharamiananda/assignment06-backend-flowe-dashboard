/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { User } from './user.model';
import { Product } from '../product/product.model';
import { Sales } from '../sales/sales.model';



const getMe = async (userId: string, role: string) => {
  const result = await User.findById(userId);

  return result;
};



const getMyDashboard = async (userId: string) => {


  const totalProducts =await Product.countDocuments();
  const today = new Date();
  
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const totalMonthSales=await Sales.countDocuments({  salesMan:userId ,soldDate:{ $gte: firstDayOfMonth, $lte: lastDayOfMonth }});

const totalWeeklySales=await Sales.countDocuments({  salesMan:userId ,soldDate:{ $gte:  today.setDate(today.getDate() - 7)  }});

const totalIncomes=await Sales.aggregate(   [
  {
    $group:
      {
        _id: {salesMan:userId},
        totalAmount: { $sum: "$totalPrice" },
        count: { $sum: 1 }
      }
  }
])
  return {
    totalProducts,
    totalMonthSales,
    totalWeeklySales,

totalIncomes
  };
};


export const UserServices = {
  getMe,
  getMyDashboard
};