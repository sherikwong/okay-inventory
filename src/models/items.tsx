import { ICategory } from './categories';
export interface Item {
  name: string;
  quantity: number;
  category: ICategory;
  date: Date;
}
