import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { SalesRoutes } from "../modules/sales/sales.route";
import { CouponRoutes } from "../modules/coupon/coupon.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
 
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/sales",
    route: SalesRoutes,
  },
  {
    path: "/coupons",
    route: CouponRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  

  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
