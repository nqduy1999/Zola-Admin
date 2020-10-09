/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  dispatchDefaultAction,
  fetchUsersAction
} from '../../redux/actions/Users.action';
import { Col, Row, Button } from 'antd';
import { classPrefixor } from '../../utils/classPrefixor';
import { UserAddOutlined } from '@ant-design/icons';
import UserTable from './UserTable';
import UserModalAdd from './UserModalAdd';

const prefix = 'users';
const c = classPrefixor(prefix);

const UsersComponent = () => {
  const dispatch = useDispatch();
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(dispatchDefaultAction());
  }, []);

  const renderUsersComponent = () => {
    const handleCloseModal = bool => {
      setShowModalAddUser(bool);
    };
    return (
      <>
        <section className={prefix}>
          <nav className={c`header`}>
            <Row>
              <Col offset="22" span="2">
                <Button
                  type="primary"
                  onClick={() => setShowModalAddUser(true)}
                >
                  <UserAddOutlined />
                  Add User
                </Button>
              </Col>
            </Row>
          </nav>
          <UserTable />
        </section>
        {showModalAddUser && (
          <UserModalAdd
            showModal={showModalAddUser}
            handleCloseModalRoot={handleCloseModal}
          />
        )}
      </>
    );
  };
  return <>{renderUsersComponent()}</>;
};

export default UsersComponent;
