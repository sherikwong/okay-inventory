import { ICategory } from './categories';
import { IBaseModel } from '../database/base';
export interface IItem extends IBaseModel {
  name?: string;
  quantity?: number;
  category?: ICategory;
  date?: Date;
}
