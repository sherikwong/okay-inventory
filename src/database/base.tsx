import { db } from './index';

export class BaseDB<T> {
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
    // const newKey = this._db.push().key;
    this._db.set(data).then(res => console.log(res));
  }
}
