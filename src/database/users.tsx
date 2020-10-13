import { BaseDB, IBaseDB, IBaseModel } from './base';
export const USERS = 'users';

export interface ITag extends IBaseModel {
  email: string;
  isAdmin: boolean;
}
// interface ITagsDB extends IBaseDB<ITag> {

// }

class UsersDB extends BaseDB<any> {
  constructor() {
    super(USERS);
  }


}

export const usersDB = new UsersDB();
