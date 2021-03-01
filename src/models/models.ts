import { IBaseDB, IBaseModel } from './../database/base';
import { IField, Fields } from './../types/form/field';

export interface IModels extends IBaseModel {
  name: string;
  fields: Fields;
}
