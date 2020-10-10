import React from 'react';
import PropTypes from 'prop-types';
import { classPrefixor } from '../../utils/classPrefixor';
import { Row, Col, Avatar, Dropdown, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../../redux/actions/Account.action';

const prefix = 'header';
const c = classPrefixor(prefix);
const Header = props => {
  const { role } = useSelector(state => state.AccountReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    history.push('/');
    localStorage.clear();
    dispatch(signOutAction());
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleLogout()}>
        <LogoutOutlined style={{ fontSize: '15px' }} />
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <section className="right">
        <Row className={prefix}>
          <Col lg={{ offset: 23 }} className={c`right`}>
            <Dropdown overlay={menu} trigger={['click']}>
              <p
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
              >
                <Avatar
                  style={{ cursor: 'pointer', backgroundColor: '#f56a00' }}
                  size="large"
                >
                  {role}
                </Avatar>
              </p>
            </Dropdown>
          </Col>
        </Row>
        <section className={c`content`}>{props.children}</section>
      </section>
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
