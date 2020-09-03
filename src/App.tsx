
import { Card } from 'grommet';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import Routes, { IRoute } from './Routes';
import { history } from './Routes';


const App = () => {
  const childRoute = (route: IRoute, i: number) => (
    <div>
      <Route exact path={route.path} key={i}>
        {React.createElement(route.component)}
      </Route>
    </div>
  );


  const recursiveRoute = (routes: IRoute[]) => routes.map((route, i) => {
    return route.children && route.children.length
      ? (<Router key={i} history={history}>
        {route.children.map((child, i) => childRoute(child, i))}
      </Router>)
      : childRoute(route, i);
  });

  return (
    <Card>
      {recursiveRoute(Routes)}
    </Card>
  );
};

export default App;
