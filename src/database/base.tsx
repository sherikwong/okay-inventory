import { db } from './index';

export interface IBaseDB<T> {
  getAll(): Array<T>;
  add(data: T): void;
  update(id: string, data: T): void;
}

export interface IBaseModel {
  dateCreated: Date;
  dateModified?: Date;
}

export class BaseDB<T> implements IBaseDB<T> {
  private _db: firebase.database.Reference;
  private _items: T[] = [];

  constructor(dbName: string) {
    this._db = db.ref().child(dbName);
  }

  public getAll(): T[] {
    this._db.once('value', res => {
      this._items = res.val();
    })

    return this._items;
  }

  public add(data: T): string | null {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data['dateCreated'] = new Date();

    newEntry.set(data);
    return newEntry.key;
  }

  public update(id: string, data: T): void {
    this._db.update({
      [id]: data
    });
  }
}
