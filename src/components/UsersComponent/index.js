import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAction } from '../../redux/actions/Users.action';
import { Col, Row, Button } from 'antd';
import { classPrefixor } from '../../utils/classPrefixor';
import { UserAddOutlined, FilterOutlined } from '@ant-design/icons';
import UserTable from './UserTable';

const prefix = 'users';
const c = classPrefixor(prefix);

const UsersComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  return (
    <>
      <section className={prefix}>
        <nav className={c`header`}>
          <Row>
            <Col span="4">
              <span className={c`header__text`}>User List</span>
            </Col>
            <Col span="5" offset="15" style={{ textAlign: 'right' }}>
              <Button type="primary">
                <UserAddOutlined />
                Add User
              </Button>
              <Button type="primary">
                <FilterOutlined />
                Filter
              </Button>
            </Col>
          </Row>
        </nav>
        <UserTable />
      </section>
    </>
  );
};

export default UsersComponent;
