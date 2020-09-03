
import { Card } from 'grommet';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes, { IRoute } from './Routes';
import Deduct from './components/deduct/Deduct';


const App = () => {
  const childRoute = (route: IRoute, i: number) => (
    <div>
      {route.path}
      <Route exact path={route.path} key={i}>
        {React.createElement(route.component)}
      </Route>
    </div>
  );


  const recursiveRoute = (routes: IRoute[]) => routes.map((route, i) => {
    return route.children && route.children.length
      ? (<BrowserRouter key={i}>
        {route.children.map((child, i) => childRoute(child, i))}
      </BrowserRouter>)
      : childRoute(route, i);
  });

  return (
    <Card>
      {recursiveRoute(Routes)}

    </Card>
  );
};

export default App;
