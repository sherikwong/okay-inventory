import { List, Menu } from 'grommet';
import { Scan } from 'grommet-icons';
import ItemRouter from './components/item/Router';
import { NewModel } from './components/features/model/new/new-model';
import { Models } from './components/features/models/models';

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
  '/model/:id': {
    component: NewModel,
  },
  '/models': {
    component: Models,
  },
  '/': {
    component: Scan,
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
