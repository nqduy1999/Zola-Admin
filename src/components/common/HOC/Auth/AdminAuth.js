import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Sử dụng HOC để override lại component Route, dùng để bảo vệ component không cho truy cập khi chưa đăng nhập
const AdminAuth = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={routerProps => {
        const credential = JSON.parse(localStorage.getItem('credential'));
        if (credential) {
          if (credential.role === 'ADMIN') {
            return <Component {...routerProps} />;
          }
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default AdminAuth;
AdminAuth.propTypes = {
  component: PropTypes.elementType
};

AdminAuth.defaultProps = {
  component: () => {}
};
