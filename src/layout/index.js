import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { Row, Col } from 'antd';

const Layout = props => {
  return (
    <Row className="layoutApp">
      <Col lg={{ span: 4 }} className="left">
        <SideBar />
      </Col>
      <Col lg={{ span: 20 }} className="right">
        <Header {...props} />
      </Col>
    </Row>
  );
};

export default Layout;
