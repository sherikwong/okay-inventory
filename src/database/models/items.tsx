import { db } from '../index';

export const ITEMS = 'items';

export const itemsDB = db.ref().child(ITEMS);


