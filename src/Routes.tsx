import Deduct from './components/deduct/Deduct';
import Item from './components/item/Item';
import { createBrowserHistory } from 'history';
import Create from './components/item/create/Create';
import List from './components/list/List';

export interface IRoute {
  path: string;
  children?: IRoute[];
  component?: any;
}

const routes: IRoute[] = [
  { path: '/', component: List },
  // {
  //   path: '/',
  //   component: Deduct
  // },
  {
    path: '/item',
    component: Item
  },
  {
    path: '/create',
    component: Create
  },
];

export const history = createBrowserHistory();

export default routes;
