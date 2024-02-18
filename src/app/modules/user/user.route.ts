



  import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get(
    '/me',
    auth(USER_ROLE.Manager,USER_ROLE.Seller),

    UserControllers.getMe,
  );



export const UserRoutes = router;
