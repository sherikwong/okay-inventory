import { List } from 'grommet';

import { Inventory } from './components/pages/Inventory/Inventory';
import Scan from './components/scan/scan';

export const routes = {
  '/inventory/:id': {
    component: Inventory,
  },
  '/list': {
    component: List,
  },
  '/': {
    component: Scan,
  },
};
