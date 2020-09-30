import React from 'react';

import LoginPage from '../pages/LoginPage';
import PageNotFound from '../pages/PageNorFound';

export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <LoginPage />
  },

  {
    path: '',
    exact: false,
    main: () => <PageNotFound />
  }
];
