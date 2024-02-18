/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { User } from './user.model';



const getMe = async (userId: string, role: string) => {
  const result = await User.findById(userId);

  return result;
};

export const UserServices = {
  getMe
};