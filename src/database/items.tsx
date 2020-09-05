import { db } from '.';
import { BaseDB, IBaseDB } from './base';
import { IItem } from '../models/items';

export interface IItemsDB extends IBaseDB<IItem> {

}

const ITEMS = 'items';
class ItemsDB extends BaseDB<IItem> implements IItemsDB {
  constructor() {
    super(ITEMS);
  }
}

export const itemsDB = new ItemsDB();
