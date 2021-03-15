import { Fields as TFields } from './../../../../types/form/field';
import { IField } from '../../../../types/form/field';

export interface IReducer {
  action: 'increment' | 'decrement' | 'add' | 'delete' | 'modify' | 'overwrite';
  field?: IField;
  fields?: TFields;
}
