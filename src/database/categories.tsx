import { db } from '.';

export const CATEGORIES = 'categories';

export const categoriesDB = db.ref().child(CATEGORIES);


interface ICategoriesDB extends IBaseDB<ICategory> {

}

class CategoriesDB extends BaseDB<ICategory> implements ICategoriesDB {
  constructor() {
    super(CATEGORIES);
  }

  public get(id: string): Promise<any> {
    return db.ref().child(this.dbName + '/' + id).once('value')
      .then(snapshot => {
        const data = snapshot && snapshot.exists() ? snapshot.val() : undefined;

        return data && { ...data, tags: new Set(data.tags) };
      });
  }

  public update(id: string, data: ICategory): Promise<any> {
    data.tags = data.tags ? [...data.tags].filter(el => el) : undefined;

    return this._db.update({
      [id]: data
    });
  }
}

export const CategoriesDB = new CategoriesDB();
