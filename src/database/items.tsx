import { db } from '.';
import { BaseDB, IBaseDB } from './base';

const ITEMS = 'items';
class ItemsDB<IItem> extends BaseDB<IItem> implements IBaseDB<IItem> {
  constructor() {
    super(ITEMS);
  }
}

export const itemsDB = new ItemsDB();
