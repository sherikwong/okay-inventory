/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IItem } from '../models/items';
import { BaseDB, IBaseDB } from './base';

export interface IItemsDB extends IBaseDB<IItem> {

}

const ITEMS = 'items';
class ItemsDB extends BaseDB<IItem> implements IItemsDB {
  constructor() {
    super(ITEMS);
  }

}

export const itemsDB = new ItemsDB();
