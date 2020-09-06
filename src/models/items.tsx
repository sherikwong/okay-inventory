import { IBaseModel } from '../database/base';
export interface IItem extends IBaseModel {
  id?: string;
  name?: string;
  quantity?: number;
  tags?: string[] | Set<string>;
  date?: Date;
}
