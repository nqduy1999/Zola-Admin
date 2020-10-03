import React from 'react';
import Header from './Header';
import SideBar from './SideBar';

const Layout = props => {
  return (
    <section className="layoutApp">
      <SideBar />
      <Header {...props} />
    </section>
  );
};

export default Layout;
