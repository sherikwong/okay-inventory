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

  public get(id: string): Promise<any> {
    return db.ref().child(this.dbName + '/' + id).once('value')
      .then(snapshot => {
        const data = snapshot && snapshot.exists() ? snapshot.val() : undefined;

        return data && { ...data, tags: new Set(data.tags) };
      });
  }

  public update(id: string, data: IItem): Promise<any> {
    data.tags = data.tags ? [...data.tags].filter(el => el) : undefined;

    return this._db.update({
      [id]: data
    });
  }
}

export const itemsDB = new ItemsDB();
