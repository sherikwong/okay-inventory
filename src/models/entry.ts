import { IBaseDB, IBaseModel } from '../database/base';
import { IField, Fields } from '../types/form/field';

export interface IEntry extends IBaseModel {
  modelID: string;
  [key: string]: any;
}
