import { IBaseModel } from '../database/base';
import { ITag } from '../database/tags';
export interface IItem extends IBaseModel {
  name?: string;
  quantity: number;
  tags?: string[];
  date?: Date;
}
