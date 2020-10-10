/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Avatar,
  Button,
  Space,
  Input,
  Popconfirm,
  message
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  UserOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  deleteUserAction,
  dispatchDefaultAction,
  fetchUsersAction
} from '../../../redux/actions/Users.action';
import { toast } from 'react-toastify';

const UserTable = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { users, messageDelete, dataErrDelete } = useSelector(
    state => state.UsersReducer
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageDelete.length > 0) {
      toast.success(`${messageDelete}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchUsersAction());
    } else {
      if (dataErrDelete) {
        dataErrDelete.map(item => {
          toast.error(`${item.msg}`, {
            position: 'top-right',
            autoClose: 2000
          });
          return item;
        });
      }
    }
    dispatch(dispatchDefaultAction());
  }, [messageDelete, dataErrDelete]);

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

  const confirm = id => {
    if (id) dispatch(deleteUserAction(id));
  };

  const cancel = e => {
    message.error('You dont want delete this user!');
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
      fixed: 'left',

      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, record) => (
        <div className="User__info">
          {record.avatar === null ? (
            <Avatar icon={<UserOutlined />} size="large" />
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
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="icon del" />
          </Popconfirm>
          ,
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
      scroll={{ x: 1300 }}
      pagination={{
        defaultPageSize: 5,
        showQuickJumper: true,
        position: ['bottomCenter']
      }}
    />
  );
};

export default UserTable;
