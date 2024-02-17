import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/",
// auth(USER_ROLE.Manager,USER_ROLE.Seller),

ProductControllers.getAllProducts);

router.get("/filter-options",
// auth(USER_ROLE.Manager,USER_ROLE.Seller),


ProductControllers.getAllFilterOptions);

router.post(
  "/",
  auth(USER_ROLE.Manager),


  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct
);

router.get("/:slug",
// auth(USER_ROLE.Manager,USER_ROLE.Seller),


ProductControllers.getSingleProduct);

router.patch(
  "/:productId",
  auth(USER_ROLE.Manager),


  //   validateRequest(AcademicSemesterValidations.),
  ProductControllers.updateProduct
);


router.delete(
  "/delete-products",
  auth(USER_ROLE.Manager),


  //   validateRequest(AcademicSemesterValidations.),
  ProductControllers.deleteProducts
);

export const ProductRoutes = router;
