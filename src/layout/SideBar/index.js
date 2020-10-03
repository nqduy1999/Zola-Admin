import React, { useState } from 'react';
import { classPrefixor } from '../../utils/classPrefixor';
import { Menu } from 'antd';
import {
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import logo from '../../assets/images/logo.png';

const { SubMenu } = Menu;

const prefix = 'sidebar';
const c = classPrefixor(prefix);
const SideBar = () => {
  const [collapsed] = useState(false);

  return (
    <div style={{ width: 256 }} className={prefix}>
      <div className={c`img`}>
        <img src={logo} alt="logo" />
      </div>
      <Menu
        defaultSelectedKeys={['2']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="User Managerment">
          <Menu.Item key="2" icon={<UserSwitchOutlined />}>
            User List
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
            Add User
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
