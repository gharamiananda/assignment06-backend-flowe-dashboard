import { Model } from "mongoose";
import { Document } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser extends Document {
  name: string;
  email: string;
  role:"manager"|"seller"|'customer',
passwordChangeAt?: Date;
  password: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  status:'active' | 'blocked'
};




export interface UserModel extends  Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}


export type TUserRole = "manager"|"seller"|'customer'