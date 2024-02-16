import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CouponServices } from "./coupon.service";

const createCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.createCouponIntoDB(req.user,req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Coupon  created successfully",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const Products = await CouponServices.getAllCouponFromDB(req.query);


  

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon retrieved successfully",
    data: {Products},

  });
});


const getSingleCoupon = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await CouponServices.getSingleCouponFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon is retrieved successfully",
    data: result,
  });
});

const deleteCoupons = catchAsync(async (req, res) => {
  const  productsIds = req.body;
  const result = await CouponServices.deleteCouponsIntoDB(productsIds);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Coupon is Deleted successfully",
    data: result,
  });
});


export const CouponControllers = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  deleteCoupons,
};
