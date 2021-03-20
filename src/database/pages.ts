/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IPages } from '../models/pages';
import { BaseDB, IBaseDB } from './base';

export interface IPagesDB extends IBaseDB<IPages> {}

const PAGES = 'pages';

class PagesDB extends BaseDB<IPages> implements IPagesDB {
  constructor() {
    super(PAGES);
  }
}

export const pagesDB = new PagesDB();
