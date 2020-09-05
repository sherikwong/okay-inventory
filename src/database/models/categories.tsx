import { db } from '../index';

export const CATEGORIES = 'categories';

export const categoriesDB = db.ref().child(CATEGORIES);


