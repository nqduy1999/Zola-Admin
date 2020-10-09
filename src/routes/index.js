import React from 'react';

import SignInPage from '../pages/SignInPage';
import PageNotFound from '../pages/PageNorFound';
import Layout from '../layout';
import UsersPage from '../pages/UsersPage';
import AddUserPage from '../pages/AddUserPage';
import AdminAuth from '../components/common/HOC/Auth/AdminAuth';
import ProfileAdmin from '../pages/Profile/ProfileAdmin';
import UserDetail from '../pages/UserDetail';
export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SignInPage />
  },
  {
    path: '/admin/profile',
    exact: true,
    main: () => (
      <Layout>
        <AdminAuth component={ProfileAdmin}></AdminAuth>
      </Layout>
    )
  },
  {
    path: '/admin/users',
    exact: true,
    main: () => (
      <Layout>
        <AdminAuth component={UsersPage}></AdminAuth>
      </Layout>
    )
  },

  {
    path: '/admin/addUser',
    exact: true,
    main: () => (
      <Layout>
        <AdminAuth component={AddUserPage}></AdminAuth>
      </Layout>
    )
  },
  {
    path: '/admin/user/:id',
    exact: true,
    main: () => (
      <Layout>
        <AdminAuth component={UserDetail}></AdminAuth>
      </Layout>
    )
  },
  {
    path: '',
    exact: false,
    main: () => <PageNotFound />
  }
];
