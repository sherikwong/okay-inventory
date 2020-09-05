import { createBrowserHistory } from 'history';
import EditItem from './components/Item/EditItem/EditItem';
import Item from './components/Item/Item';
// import List from './components/list/List';

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
    path: '/',
    component: Item

  },
];

export const history = createBrowserHistory();

export default routes;
