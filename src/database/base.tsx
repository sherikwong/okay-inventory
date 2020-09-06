import { db } from './index';

export interface IBaseDB<T> {
  getAll(): Promise<T[]>;
  add(data: T): void;
  update(id: string, data: T): void;
}

export interface IBaseModel {
  dateCreated?: Date;
  dateModified?: Date;
}

export class BaseDB<T> implements IBaseDB<T> {
  protected _db: firebase.database.Reference;
  protected _items: T[] = [];

  constructor(protected dbName: string) {
    this._db = db.ref().child(dbName);
  }

  public getAll(): Promise<T[]> {
    return this._db.once('value', res => {
      this._items = res.val();
    }).then(res => this._items);

  }

  public get(id: string): Promise<any> {
    return db.ref().child(this.dbName + '/' + id).once('value')
      .then(snapshot => snapshot && snapshot.exists() ? snapshot.val() : undefined);
  }

  public add(data: T): Promise<any> {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data['dateCreated'] = new Date();

    return newEntry.set(data)
      .then(() => newEntry.key);
  }

  public update(id: string, data: T): Promise<any> {
    return this._db.update({
      [id]: data
    });
  }
}
