import { IBaseModel } from './../database/base';
export interface IFood extends IBaseModel {
  proteinType: string;
  name: string;
  date: string;
  quantity: number;
  type: string;
}
