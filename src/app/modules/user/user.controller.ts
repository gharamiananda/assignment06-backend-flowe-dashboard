import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
// import { AuthServices } from './auth.service';
import config from '../../config';
import { UserServices } from './user.service';



const getMe = catchAsync(async (req, res) => {
    const { _id, role } = req.user;
    const result = await UserServices.getMe(_id, role);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  });





export const UserControllers = {
    getMe,
};
