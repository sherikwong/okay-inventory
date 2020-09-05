import { createBrowserHistory } from 'history';
import List from './components/List/List';
import EditItem from './components/Item/EditItem/EditItem';
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
  // {
  //   path: '/item',
  //   component: Item
  // },
  {
    path: '/item/:id',
    component: EditItem

  },
];

export const history = createBrowserHistory();

export default routes;
