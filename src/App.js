import React, { useEffect } from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import { setAuthorization } from './utils/axios';
import { useDispatch } from 'react-redux';
import { CREDENTIAL_TYPE } from './redux/constants/Account.constant';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const credential = JSON.parse(localStorage.getItem('credential'));
    if (credential) {
      setAuthorization(credential.accessToken);
      dispatch({
        type: CREDENTIAL_TYPE.SIGNIN_SUCCESS,
        payload: credential
      });
    }
  }, [dispatch]);

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
