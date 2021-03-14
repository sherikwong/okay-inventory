import { IEntry } from './../models/entry';
import { BaseDB, IBaseDB } from './base';

export interface IEntryDB extends IBaseDB<IEntry> {}

const ENTRIES = 'entries';
class EntriesDB extends BaseDB<IEntry> implements IEntryDB {
  constructor() {
    super(ENTRIES);
  }

  public add(data: Partial<IEntry>): Promise<any> {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data.id = newEntry.key as any;
    data.dateCreated = new Date();

    return newEntry.set(data).then((res) => {
      return data;
    });
  }
}

export const entriesDB = new EntriesDB();
