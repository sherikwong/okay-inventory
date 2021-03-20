import { Inventory } from './components/pages/Inventory/Inventory';
import { List, Menu } from 'grommet';
import { Entry } from './components/features/entry/entry';
import { Model } from './components/features/model/model';
import { EditModel } from './components/features/model/edit/edit-model';
import { Models } from './components/features/models/models';

export const routes = {
  '/inventory/:id': {
    component: Inventory,
  },
  '/list': {
    component: List,
  },
  '/entry/:id': {
    component: Entry,
  },
  '/model/:id/edit': {
    component: EditModel,
  },
  '/model/new': {
    component: EditModel,
  },
  '/model/:id': {
    component: Model,
  },
  '/models': {
    component: Models,
  },
  '/': {
    component: Models,
  },
};
