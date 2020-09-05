import { createBrowserHistory } from 'history';
import List from './components/List/List';
export interface IRoute {
  path: string;
  children?: IRoute[];
  component?: any;
}

const routes: IRoute[] = [
  { path: '/', component: List },
  // // {
  // //   path: '/',
  // //   component: Deduct
  // // },
  // {
  //   path: '/item',
  //   component: Item
  // },
  // {
  //   path: '/',
  //   component: EditItem

  // },
];

export const history = createBrowserHistory();

export default routes;
