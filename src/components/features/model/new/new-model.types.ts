import { IField } from '../../../../types/form/field';

export interface IReducer {
  action: 'increment' | 'decrement' | 'add' | 'delete' | 'modify';
  field: IField;
}
