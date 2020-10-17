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

  public add(data: Partial<IItem>): Promise<any> {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data.id = newEntry.key as any;
    data.dateCreated = new Date();
    data.quantity = 1;

    return newEntry.set(data)
      .then(res => {
        return data;
      });
  }

}

export const itemsDB = new ItemsDB();
