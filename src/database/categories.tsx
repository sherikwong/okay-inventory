import { db } from '.';

export const CATEGORIES = 'categories';

export const categoriesDB = db.ref().child(CATEGORIES);


