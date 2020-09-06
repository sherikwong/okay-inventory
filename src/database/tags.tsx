import { BaseDB } from './base';

export const TAGS = 'tags';

export interface ITag {
  name: string;
  children: ITag[];
}

interface ITagsDB extends IBaseDB<ITag> {

}

class TagsDB extends BaseDB<ITag> implements ITagsDB {
  constructor() {
    super(TAGS);
  }
}

export const tagsDB = new TagsDB();
