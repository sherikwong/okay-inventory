import { List, Menu } from 'grommet';
import { Model } from './components/features/model/model';
import { NewModel } from './components/features/model/new/new-model';
import { Models } from './components/features/models/models';
import ItemRouter from './components/item/Router';

export const routes = {
  '/item/:id': {
    component: ItemRouter,
    buttons: {
      top: [],
      bottom: [],
    },
  },
  '/list': {
    component: List,
    buttons: {
      top: [],
      bottom: [],
    },
  },
  '/model/new': {
    component: NewModel,
  },
  '/model/:id/edit': {
    component: NewModel,
  },
  '/model/:id': {
    component: Model,
  },
  '/models': {
    component: Models,
  },
  '/': {
    component: Models,
    buttons: {
      top: [
        {
          icon: Menu,
        },
      ],
      bottom: [],
    },
  },
};
