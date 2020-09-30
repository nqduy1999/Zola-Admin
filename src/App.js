import React from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
  const showContentMenu = routes => {
    if (routes.length > 0) {
      return routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
  };

  return (
    <Router>
      <Switch>{showContentMenu(routes)}</Switch>
    </Router>
  );
};

export default App;
