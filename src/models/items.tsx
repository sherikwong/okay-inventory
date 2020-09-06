import { IBaseModel } from '../database/base';
export interface IItem extends IBaseModel {
  name?: string;
  quantity?: number;
  tags?: string[] | Set<string>;
  date?: Date;
}
