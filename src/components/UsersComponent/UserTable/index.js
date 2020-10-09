/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table, Tag, Avatar, Button, Space, Input } from 'antd';
import { EyeOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserTable = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { users } = useSelector(state => state.UsersReducer);
  const history = useHistory();

  const handleDetail = id => {
    if (id) history.push(`/admin/user/${id}`);
  };

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : ''
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, record) => (
        <div className="User__info">
          {record.avatar === null ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <img src={record.avatar} alt="avatar" />
          )}
          <span style={{ padding: '15px' }}>{record.name}</span>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'ADMIN', value: 'ADMIN' },
        { text: 'MEMBER', value: 'MEMBER' }
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record?.role.includes(value),
      sorter: (a, b) => a.role.length - b.role.length
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      filteredValue: filteredInfo.email || null,

      render: (_, record) => (
        <>
          {record.email === null || record.email === '' ? (
            <span style={{ color: 'red' }}>User Sign Up with Phone</span>
          ) : (
            <span>{record.email}</span>
          )}
        </>
      ),
      ...getColumnSearchProps('email')
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      filteredValue: filteredInfo.phone || null,
      render: (_, record) => (
        <>
          {record.phone === '' || record.phone === null ? (
            <span style={{ color: 'red' }}>User Sign Up with Email</span>
          ) : (
            <span>{record.phone}</span>
          )}
        </>
      ),
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      filters: [
        { text: 'Active', value: 'true' },
        { text: 'Unactive', value: 'false' }
      ],
      filteredValue: filteredInfo.active || null,
      onFilter: (value, record) => record?.active.toString().includes(value),

      render: (_, record) => {
        return (
          <>
            {record.active ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="red">Unactive</Tag>
            )}
          </>
        );
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <>
          <EyeOutlined
            className="icon detail"
            onClick={() => handleDetail(record.id)}
          />
        </>
      )
    }
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      size="large"
      tableLayout="fixed"
      onChange={handleChange}
      pagination={{
        defaultPageSize: 5,
        showQuickJumper: true,
        position: ['bottomCenter']
      }}
    />
  );
};

export default UserTable;
