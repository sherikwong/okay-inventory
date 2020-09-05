import { db } from '.';

export const ITEMS = 'items';

export const itemsDB = db.ref().child(ITEMS);


export class ItemsDB {

}
