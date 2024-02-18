import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { SalesControllers } from "./sales.controller";
import { SalesValidations } from "./sales.validation";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", 
  auth(USER_ROLE.Seller, USER_ROLE.Manager),


SalesControllers.getAllSales);
router.post(
  "/",
  auth(USER_ROLE.Seller, USER_ROLE.Manager),


  validateRequest(SalesValidations.createSalesValidationSchema),
  SalesControllers.createSales
);

router.get("/:SalesId",
  auth(USER_ROLE.Seller, USER_ROLE.Manager),


SalesControllers.getSingleSales);

router.patch(
  "/:SalesId",
    auth(USER_ROLE.Seller, USER_ROLE.Manager),


  //   validateRequest(AcademicSemesterValidations.),
  SalesControllers.updateSales
);

export const SalesRoutes = router;
