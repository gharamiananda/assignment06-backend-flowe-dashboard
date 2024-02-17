import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { CouponControllers } from "./coupon.controller";
import { CouponValidations } from "./coupon.validation";

const router = express.Router();

router.get("/",
auth(USER_ROLE.Manager,USER_ROLE.Seller),

CouponControllers.getAllCoupons);

router.post(
  "/",
  auth(USER_ROLE.Manager),


  validateRequest(CouponValidations.createCouponValidationSchema),
  CouponControllers.createCoupon
);

router.get("/:slug",
auth(USER_ROLE.Manager,USER_ROLE.Seller),


CouponControllers.getSingleCoupon);


router.delete(
  "/delete-coupons",
  auth(USER_ROLE.Manager),


  //   validateRequest(AcademicSemesterValidations.),
  CouponControllers.deleteCoupons
);

export const CouponRoutes = router;
