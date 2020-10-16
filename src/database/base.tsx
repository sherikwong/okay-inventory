import { db } from '.';

export interface IBaseDB<T> {
  getAll(): Promise<T[]>;
  add(data: T): void;
  update(id: string, data: T): void;
}

export interface IBaseModel {
  dateCreated?: Date;
  dateModified?: Date;
  id: string;
}

export class BaseDB<T> implements IBaseDB<T> {
  protected _db: firebase.database.Reference;
  protected items: T[] = [];

  constructor(protected dbName: string) {
    this._db = db.ref().child(dbName);
  }

  public getAll(): Promise<T[]> {
    return this._db.once('value', res => {
      this.items = res.val();
    }).then(res => this.items);

  }
  g
  public get(id: string): Promise<any> {
    return db.ref().child(this.dbName + '/' + id).once('value')
      .then(snapshot => snapshot && snapshot.exists() ? snapshot.val() : undefined);
  }

  public add(data: Partial<T>): Promise<any> {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data['id'] = newEntry.key;
    data['dateCreated'] = new Date();

    return newEntry.set(data)
      .then(res => {
        return data;
      });
  }

  public update(id: string, data: Partial<T>): Promise<any> {
    return db.ref().child(this.dbName + '/' + id).update(data)
      .then(() => {
        console.log(`Success updating ${id}`);
      });
  }

  public delete(id: string): Promise<any> {
    return db.ref().child(this.dbName + '/' + id).remove();
  }
}
