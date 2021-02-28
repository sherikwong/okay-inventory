import { IBaseDB, IBaseModel } from './../database/base';
import { IField } from './../types/form/field';

export interface IModels extends IBaseModel {
  name: string;
  fields: IField[];
}
