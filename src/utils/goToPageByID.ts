import { pagesDB } from './../database/pages';

export const navigateToPageID = (modelID: string, id: string, history) => {
  if (modelID) {
    pagesDB.get(modelID).then((page) => {
      if (page && page.path) {
        history.push(`${page.path}/${id}`);
      }
    });
  }
};
