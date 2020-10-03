import React from 'react';

import SignInPage from '../pages/SignInPage';
import PageNotFound from '../pages/PageNorFound';
import AdminPage from '../pages/AdminPage';
import Layout from '../layout';
import UsersPage from '../pages/UsersPage';
import AddUserPage from '../pages/AddUserPage';
export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SignInPage />
  },

  {
    path: '/admin',
    exact: true,
    main: () => (
      <Layout>
        <AdminPage />
      </Layout>
    )
  },

  {
    path: '/admin/users',
    exact: false,
    main: () => (
      <Layout>
        <UsersPage />
      </Layout>
    )
  },
  {
    path: '/admin/addUser',
    exact: false,
    main: () => (
      <Layout>
        <AddUserPage />
      </Layout>
    )
  },
  {
    path: '',
    exact: false,
    main: () => <PageNotFound />
  }
];
