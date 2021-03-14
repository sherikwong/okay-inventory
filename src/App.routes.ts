import { List, Menu } from 'grommet';
import { Scan } from 'grommet-icons';
import ItemRouter from './components/item/Router';
import { NewModel } from './components/features/model/new/new-model';

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
  '/models/new': {
    component: NewModel,
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
