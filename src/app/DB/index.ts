import config from '../config';
import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const managerInfo = {
  name: 'Ananda Gharami',
  email: 'anandamanager@gmail.com',
  password: config.seed_manager_password,
  needsPasswordChange: false,
  role: USER_ROLE.Manager,
  status: 'active',
  isDeleted: false,
  passwordChangeAt:new Date(),
};



const seedSuperManager = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isManagerExits = await User.findOne({ role: USER_ROLE.Manager });
  if (!isManagerExits) {
  await User.create(managerInfo);
 
  }
};

export default seedSuperManager;