import {
  AppstoreOutlined,
  ContactsOutlined,
  HomeOutlined,
  KeyOutlined,
  MailOutlined,
  ProfileOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import ProfileGeneral from './ProfileGeneral';
const { SubMenu } = Menu;

const ProfileAdmin = () => {
  const [changePassword, setChangePassword] = useState(false);
  const prefix = 'profile-admin';
  return (
    <div className={`${prefix}_container`}>
      <div className="main-content">
        <Row>
          <Col span={5}>
            <Menu
              style={{ paddingTop: '70px' }}
              mode="inline"
              defaultOpenKeys={['sub1', 'sub2']}
            >
              <Menu.Item
                key="1"
                icon={<HomeOutlined />}
                onClick={() => {
                  setChangePassword(false);
                }}
              >
                Home
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <ProfileOutlined /> <span>My Profile</span>
                  </span>
                }
              >
                <Menu.Item
                  key="2"
                  icon={<UserOutlined />}
                  onClick={() => {
                    setChangePassword(false);
                  }}
                >
                  Profile User
                </Menu.Item>
                <Menu.Item key="3" icon={<ContactsOutlined />}>
                  Contact Info
                </Menu.Item>
                <Menu.Item key="4" icon={<MailOutlined />}>
                  Email
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Security">
                <Menu.Item
                  key="5"
                  icon={<KeyOutlined />}
                  onClick={() => {
                    setChangePassword(true);
                  }}
                >
                  Password
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col span={19}>
            <ProfileGeneral
              changePassword={changePassword}
              setChangePassword={setChangePassword}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ProfileAdmin;
