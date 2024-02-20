/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './user.model';
import { Product } from '../product/product.model';
import { Sales } from '../sales/sales.model';



const getMe = async (userId: string, role: string) => {
  const result = await User.findById(userId);

  return result;
};



const getMyDashboard = async (userId: string,role:string) => {


  const totalProducts =await Product.countDocuments();
  const today = new Date();
  
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const totalMonthSales=await Sales.countDocuments({  salesMan:userId ,soldDate:{ $gte: firstDayOfMonth, $lte: lastDayOfMonth }});

const totalSales=await Sales.countDocuments({  salesMan:userId });

const totalIncomes=await Sales.aggregate(   [
  {
    $group:
      {
        _id: {salesMan:userId},
        totalAmount: { $sum: "$totalPrice" },
        count: { $sum: 1 }
      }
  }
]);



const sendData:Record<string, unknown> ={
  totalProducts,
  totalMonthSales,
  totalSales,
  

totalIncomes
}

let totalSeller

if(role==='manager'){
  totalSeller= await User.countDocuments({role:'seller'});

  sendData.totalSeller=totalSeller
}


  return sendData
};


export const UserServices = {
  getMe,
  getMyDashboard
};