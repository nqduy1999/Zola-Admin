import React, { useState } from 'react';
import { classPrefixor } from '../../utils/classPrefixor';
import { Menu } from 'antd';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

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
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="User Managerment">
          <div className="nav-item">
            <NavLink to="/admin/users">
              <UserSwitchOutlined />
              <span>User List</span>
            </NavLink>
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideBar;
