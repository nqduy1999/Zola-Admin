import React from 'react';

import SignInPage from '../pages/SignInPage';
import PageNotFound from '../pages/PageNorFound';
import AdminPage from '../pages/AdminPage';

export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SignInPage />
  },

  {
    path: '/admin',
    exact: false,
    main: () => <AdminPage />
  },

  {
    path: '',
    exact: false,
    main: () => <PageNotFound />
  }
];
