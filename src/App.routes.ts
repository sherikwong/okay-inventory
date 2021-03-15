import { List, Menu } from 'grommet';
import { Entry } from './components/features/entry/entry';
import { Model } from './components/features/model/model';
import { EditModel } from './components/features/model/edit/edit-model';
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
