import { db } from './index';

export interface IBaseDB<T> {
  get(): Array<T>;
  add(data: T): void;
  update(id: string, data: T): void;
}

export class BaseDB<T> implements IBaseDB<T> {
  private _db: firebase.database.Reference;
  private _items: T[] = [];

  constructor(dbName: string) {
    this._db = db.ref().child(dbName);
  }

  public get(): Array<T> {
    this._db.once('value', res => {
      this._items = res.val();
    })

    return this._items;
  }

  public add(data: T): void {
    const newEntry = this._db.push();
    newEntry.set(data).then(res => console.log(res));
  }

  public update(id: string, data: T): void {
    this._db.update({
      [id]: data
    });
  }
}
