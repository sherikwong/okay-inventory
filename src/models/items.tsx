import { ICategory } from './categories';
export interface IItem {
  name: string;
  quantity: number;
  category: ICategory;
  date: Date;
}
