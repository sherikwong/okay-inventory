/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IModels } from '../models/models';
import { BaseDB, IBaseDB } from './base';

export interface IModelssDB extends IBaseDB<IModels> {}

const MODELS = 'models';
class ModelsDB extends BaseDB<IModels> implements IModelssDB {
  constructor() {
    super(MODELS);
  }

  public add(data: Partial<IModels>): Promise<any> {
    const newEntry = this._db.push();

    // TODO: SK: Revisit bracket notation;
    data.id = newEntry.key as any;
    data.dateCreated = new Date();

    return newEntry.set(data).then((res) => {
      return data;
    });
  }
}

export const modelsDB = new ModelsDB();
