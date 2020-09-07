import { IBaseModel } from '../database/base';
import { ITag } from '../database/tags';
export interface IItem extends IBaseModel {
  id?: string;
  name?: string;
  quantity?: number;
  tags?: { [key: string]: ITag };
  date?: Date;
}
