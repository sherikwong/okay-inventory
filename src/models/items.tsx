import { IBaseModel } from '../database/base';
export interface IItem extends IBaseModel {
  name?: string;
  quantity?: number;
  category?: string;
  date?: Date;
}
