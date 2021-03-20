import { pagesDB } from './../database/pages';
import { Inventory } from './../components/pages/Inventory/Inventory';
import { useHistory } from 'react-router-dom';
import { IModel } from './../models/models';

const pageToComponentMap = new Map<string, any>([['1', Inventory]]);

export const navigateToPageID = (modelID: string, id: string, history) => {
  if (modelID) {
    pagesDB.get(modelID).then((page) => {
      if (page && page.path) {
        history.push(`${page.path}/${id}`);
      }
    });
  }
};
