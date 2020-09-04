import Deduct from './components/deduct/Deduct';
import Item from './components/item/Item';
import { createBrowserHistory } from 'history';

export interface IRoute {
  path: string;
  children?: IRoute[];
  component?: any;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: Deduct
  },
  {
    path: '/item',
    component: Item
  }
];

export const history = createBrowserHistory();

export default routes;
