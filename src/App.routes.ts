import { List, Menu } from 'grommet';
import { Entry } from './components/features/entry/entry';
import { Model } from './components/features/model/model';
import { NewModel } from './components/features/model/new/new-model';
import { Models } from './components/features/models/models';

export const routes = {
  // '/item/:id': {
  //   component: ItemRouter,
  //   buttons: {
  //     top: [],
  //     bottom: [],
  //   },
  // },
  '/list': {
    component: List,
    buttons: {
      top: [],
      bottom: [],
    },
  },
  '/entry/:id': {
    component: Entry,
  },
  '/model/:id/edit': {
    component: NewModel,
  },
  '/model/new': {
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
