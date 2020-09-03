import Deduct from './components/deduct/Deduct';

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
      }
    ]
  }
]

export default routes;
