import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsersAction } from '../../redux/actions/Users.action';
import { Col, Row, Button } from 'antd';
import { classPrefixor } from '../../utils/classPrefixor';
import { UserAddOutlined, FilterOutlined } from '@ant-design/icons';
import UserTable from './UserTable';
import UserModalAdd from './UserModalAdd';

const prefix = 'users';
const c = classPrefixor(prefix);

const UsersComponent = () => {
  const dispatch = useDispatch();
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const renderUsersComponent = () => {
    const handleCloseModal = bool => {
      setShowModalAddUser(bool);
    };
    return (
      <>
        <section className={prefix}>
          <nav className={c`header`}>
            <Row>
              <Col span="4">
                <span className={c`header__text`}>User List</span>
              </Col>
              <Col span="5" offset="15" style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={() => setShowModalAddUser(true)}
                >
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
