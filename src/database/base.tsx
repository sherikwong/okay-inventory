import { db } from './index';

export interface IBaseDB<T> {
  getAll(): Promise<T[]>;
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

  public getAll(): Promise<T[]> {
    return this._db.once('value', res => {
      this._items = res.val();
    }).then(res => this._items);

  }

  public add(data: T): Promise<string | null> {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data['dateCreated'] = new Date();

    return newEntry.set(data)
      .then(() => newEntry.key);
  }

  public update(id: string, data: T): Promise<void> {
    return this._db.update({
      [id]: data
    });
  }
}
