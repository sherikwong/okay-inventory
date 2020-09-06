import { createBrowserHistory } from 'history';
import List from './components/List/List';
import EditItem from './components/Item/EditItem/EditItem';
import Item from './components/Item/Item';
export interface IRoute {
  path: string;
  children?: IRoute[];
  component?: any;
}

const routes: IRoute[] = [
  // { path: '/', component: List },
  // // {
  // //   path: '/',
  // //   component: Deduct
  // // },
  {
    path: '/item/:id',
    component: Item
  },
  {
    path: '/item/:id/edit',
    component: EditItem

  },
];

export const history = createBrowserHistory();

export default routes;
