import React from 'react';
import PropTypes from 'prop-types';
import { classPrefixor } from '../../utils/classPrefixor';
import { Row, Col, Input, Avatar } from 'antd';
import { SearchOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const prefix = 'header';
const c = classPrefixor(prefix);
const Header = props => {
  return (
    <>
      <section className="right">
        <Row className={prefix}>
          <Col span="4" className={c`left`}>
            <Input
              size="middle"
              placeholder="Search"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col offset="14" span="6" className={c`right`}>
            <BellOutlined
              style={{ fontSize: '20px', color: '#08c', marginRight: '20px' }}
            />
            <Avatar
              style={{ fontSize: '24px', cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
      </section>
      <section className={c`content`}>{props.children}</section>
    </>
  );
};

export default Header;
Header.propTypes = {
  children: PropTypes.element
};

Header.defaultProps = {
  children: ''
};
