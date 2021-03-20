import { IBaseDB, IBaseModel } from './../database/base';
import { IField, Fields } from './../types/form/field';

export interface IModel<T = any> extends IBaseModel {
  name: string;
  fields: Fields;
  entries: { [key: string]: string };
  pageID: string;
}
