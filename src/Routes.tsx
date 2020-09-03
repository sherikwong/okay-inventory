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
    path: '',
    children: [
      {
        path: '',
        component: Deduct
      },
      {
        path: 'item/:id',
        component: Item
      }
    ]
  }
]

export const history = createBrowserHistory();

export default routes;
