

import List from './components/List/List';
import { Inventory } from './components/pages/Inventory/Inventory';
import Scan from './components/scan/scan';

export enum Routes {
  ENTRY = 'entry',
  LIST = 'list'
}

export const routes = {
  '/item/:id': {
    component: Inventory,
  },
  '/list': {
    component: List,
  },
  '/': {
    component: Scan,
  },
};
